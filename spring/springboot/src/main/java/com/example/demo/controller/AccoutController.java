package com.example.demo.controller;

import com.example.demo.entity.BaseAccoutEntity;
import com.example.demo.mapper.AccoutMapper;
import com.example.demo.mapper.DoctorMapper;
import com.example.demo.repository.AccountRepository;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

   /**
    * 通过openid授权登录
    * @param openId
    * @return
    */
   @GetMapping("login")
   public ResponseData loginByopen(@RequestParam(value = "openId",defaultValue = "") String openId){
      if (openId==""){
         return new ResponseData(ExceptionMsg.FAILED,"openId为空");
      }
      else{
         if(accoutMapper.findByOpen(openId)!=null){
            int doctor = doctorMapper.findByUser(accoutMapper.findByOpen(openId).getUserId()).getDoctorId();
            return new ResponseData(ExceptionMsg.SUCCESS,doctor);
         }
         else{
            return new ResponseData(ExceptionMsg.FAILED,"未找到openId");
         }
      }
   }

   /**
    * 通过phone检测登录用户是否存在，存在则将openid赋给他
    * @param map1
    * @return
    */
   @PostMapping("saveOpen")
   public ResponseData saveOpen(@RequestBody Map<String,Object> map1){
      String phone = (String) map1.get("phone");
      String open = (String) map1.get("openId");
      BaseAccoutEntity baseAccoutEntity = accoutMapper.findByPhone(phone);
      if(open==""){
         return new ResponseData(ExceptionMsg.FAILED,"openId为空");
      }
      if (baseAccoutEntity!=null){
         baseAccoutEntity.setMiniOpenId(open);
         accountRepository.save(baseAccoutEntity);
         int doctor = doctorMapper.findByUser(accoutMapper.findByOpen(open).getUserId()).getDoctorId();
         return new ResponseData(ExceptionMsg.SUCCESS,doctor);
      }
      else{
         return new ResponseData(ExceptionMsg.FAILED,"未找到对应号码");
      }
   }
}
