package com.example.demo.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.demo.entity.BaseAccoutEntity;
import com.example.demo.mapper.AccoutMapper;
import com.example.demo.mapper.DoctorMapper;
import com.example.demo.repository.AccountRepository;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("accout")
public class AccoutController {
   protected Response result(ExceptionMsg msg){
      return new Response(msg);
   }
   protected Response result(){
      return new Response();
   }
   @Autowired
   private AccoutMapper accoutMapper;
   @Autowired
   private AccountRepository accountRepository;
   @Autowired
   private DoctorMapper doctorMapper;
   @Autowired
   private RestTemplate restTemplate;//在util中有配置
   private String url = "https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={code}&grant_type=authorization_code";
   private Map<String, String> paramMap = new HashMap<>();
   /**
    * 通过openid授权登录医生
    * @param openId
    * @return
    */
   @GetMapping("login")
   public ResponseData loginByopen(@RequestParam(value = "openId",defaultValue = "") String openId){
      if (openId.equals("")){
         return new ResponseData(ExceptionMsg.FAILED,"openId为空");
      }
      else{
         try{
            paramMap.put("appid", "wxa02c207b24400c62");
            paramMap.put("secret", "44cf2d74e8767448b22d3563fd38f864");
            paramMap.put("code", openId);
            String result = this.restTemplate.getForObject(url, String.class, paramMap);
            JSONObject jsonObj  = (JSONObject) JSONObject.parse(result);
            String open = (String) jsonObj.get("openid");
            System.out.println(open);
            if(accoutMapper.findByOpen(open)!=null){
               System.out.println(open);
               if(doctorMapper.findByUser(accoutMapper.findByOpen(open).getUserId())!=null){
                  int doctor = doctorMapper.findByUser(accoutMapper.findByOpen(open).getUserId()).getDoctorId();
                  return new ResponseData(ExceptionMsg.SUCCESS,doctor);
               }
               else{
                  return new ResponseData(ExceptionMsg.TYPEWRONG,"你不是医生");
               }
            }
            else{
               return new ResponseData(ExceptionMsg.FAILED,"未找到openId");
            }
         }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
         }

      }
   }

   /**
    * 通过phone检测登录医生是否存在，存在则将openid赋给他
    * @param map1
    * @return
    */
   @PostMapping("saveOpen")
   public ResponseData saveOpen(@RequestBody Map<String,Object> map1){
      if(map1==null){
         return new ResponseData(ExceptionMsg.FAILED,"输入为空");
      }
      try{
         String phone = (String) map1.get("phone");
         String open = (String) map1.get("openId");
         BaseAccoutEntity baseAccoutEntity = accoutMapper.findByPhone(phone);
         if(open==""){
            return new ResponseData(ExceptionMsg.FAILED,"openId为空");
         }
         if (baseAccoutEntity!=null){
            paramMap.put("appid", "wxa02c207b24400c62");
            paramMap.put("secret", "44cf2d74e8767448b22d3563fd38f864");
            paramMap.put("code", open);
            String result = this.restTemplate.getForObject(url, String.class, paramMap);
            JSONObject jsonObj  = (JSONObject) JSONObject.parse(result);
            baseAccoutEntity.setMiniOpenId((String) jsonObj.get("openid"));
            accountRepository.save(baseAccoutEntity);
            int doctor = doctorMapper.findByUser(accoutMapper.findByOpen((String) jsonObj.get("openid")).getUserId()).getDoctorId();
            return new ResponseData(ExceptionMsg.SUCCESS,doctor);
         }
         else{
            return new ResponseData(ExceptionMsg.FAILED,"未找到对应号码");
         }
      }catch (Exception e){
         throw e;
         //return new ResponseData(ExceptionMsg.FAILED,"出现异常");
      }

   }

   @GetMapping("findAll")
   public ResponseData showAccout(@RequestParam(value = "start",defaultValue = "")Integer start,@RequestParam(value = "size",defaultValue = "10")Integer size,@RequestParam(value = "condition",defaultValue = "")String condition){
      if(start==null){
         return new ResponseData(ExceptionMsg.FAILED,"输入为空");
      }
      try{
         PageHelper.startPage(start,size,"user_id asc");
         List<BaseAccoutEntity> list = accoutMapper.findAll(condition);
         PageInfo<BaseAccoutEntity> page = new PageInfo<>(list);
         if(page.getSize()==0){
            return new ResponseData(ExceptionMsg.ISNULL,page);
         }
         if(start<=page.getPages()){
            return new ResponseData(ExceptionMsg.SUCCESS,page);
         }
         else{
            return new ResponseData(ExceptionMsg.NOMORE,"没有更多了");
         }
      }catch (Exception e){
         return new ResponseData(ExceptionMsg.FAILED,"出现异常");
      }

   }

   /**
    * 用户注册手机号
    * @param map1
    * @return
    */
   @PostMapping("addUser")
   public ResponseData addUser(@RequestBody Map<String,String> map1){
      if(map1==null){
         return new ResponseData(ExceptionMsg.FAILED,"输入为空");
      }
      try{
         String phone = map1.get("phone");
         if(accoutMapper.findByPhone(phone)==null){
            Date time = new Date();
            BaseAccoutEntity baseAccoutEntity = new BaseAccoutEntity();
            baseAccoutEntity.setUserType("1");
            baseAccoutEntity.setCreateTime(new Timestamp(time.getTime()));
            baseAccoutEntity.setPhoneNo(map1.get("phone"));
            paramMap.put("appid", "wxa02c207b24400c62");
            paramMap.put("secret", "44cf2d74e8767448b22d3563fd38f864");
            paramMap.put("code", map1.get("openId"));
            String result = this.restTemplate.getForObject(url, String.class, paramMap);
            JSONObject jsonObj  = (JSONObject) JSONObject.parse(result);
            baseAccoutEntity.setMiniOpenId((String) jsonObj.get("openid"));
            accountRepository.save(baseAccoutEntity);
            int id = accoutMapper.findByOpen((String) jsonObj.get("openid")).getUserId();
            System.out.println("注册成功");
            return new ResponseData(ExceptionMsg.SUCCESS,id);
         }
         else{
            return new ResponseData(ExceptionMsg.FAILED,"该手机号已被注册");
         }
      }catch (Exception e){
         return new ResponseData(ExceptionMsg.FAILED,"出现异常");
      }
   }

   /**
    * 用户通过openid登录
    * @param openId
    * @return
    */
   @GetMapping("loginUser")
   public ResponseData loginUser(@RequestParam(value = "openId") String openId){
      if (openId.equals("")){
         return new ResponseData(ExceptionMsg.FAILED,"openId为空");
      }
      else{
         paramMap.put("appid", "wxa02c207b24400c62");
         paramMap.put("secret", "44cf2d74e8767448b22d3563fd38f864");
         paramMap.put("code", openId);
         String result = this.restTemplate.getForObject(url, String.class, paramMap);
         JSONObject jsonObj  = (JSONObject) JSONObject.parse(result);
         String open = (String) jsonObj.get("openid");
         System.out.println(open);
         if(accoutMapper.findByOpen(open)!=null){
            if(accoutMapper.findByOpen(open).getUserType().equals("1")){
               System.out.println(open);
               int user = accoutMapper.findByOpen(open).getUserId();
               return new ResponseData(ExceptionMsg.SUCCESS,user);
            }
            else{
               return new ResponseData(ExceptionMsg.TYPEWRONG,"您不是用户");
            }
         }
         else{
            return new ResponseData(ExceptionMsg.FAILED,"未找到openId");
         }
      }
   }
}
