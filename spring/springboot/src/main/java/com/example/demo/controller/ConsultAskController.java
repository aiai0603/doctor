package com.example.demo.controller;


import com.example.demo.entity.ConsultAskEntity;
import com.example.demo.entity.PrescriptionInfoEntity;
import com.example.demo.mapper.ConsultAskMapper;
import com.example.demo.mapper.PrecriptionMapper;
import com.example.demo.repository.ConsultAskRepository;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import io.goeasy.GoEasy;
import io.goeasy.publish.GoEasyError;
import io.goeasy.publish.PublishListener;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("consult")
@RequiredArgsConstructor
@CrossOrigin(origins = "*",maxAge = 3600)
public class ConsultAskController {
    protected Response result(ExceptionMsg msg){
        return new Response(msg);
    }
    protected Response result(){
        return new Response();
    }

     @Autowired
    ConsultAskMapper consultAskMapper;
    @Autowired
    ConsultAskRepository consultAskRepository;
    @Autowired
    PrecriptionMapper precriptionMapper;

    GoEasy goEasy = new GoEasy( "http://rest-hangzhou.goeasy.io/v2/pubsub/publish","BC-a904c0f55e454600be7a7bb181d9a4be");
    /**
     * 通过分页返回所有的复诊配药信息
     * @param type
     * @param doctorId
     * @param start
     * @return
     */
    @GetMapping("findAll")
    public ResponseData findAll(@RequestParam("type") Integer type,@RequestParam("doctorId") String doctorId,@RequestParam(value = "start", defaultValue = "0") Integer start,@RequestParam(value = "size",defaultValue = "4") Integer size){
        PageHelper.startPage(start,size,"create_time asc");
        List<ConsultAskEntity> list = consultAskMapper.findAll(doctorId,type);
        PageInfo<ConsultAskEntity> page =new PageInfo<>(list);
        if(start<=page.getPages()){
            return new ResponseData(ExceptionMsg.FIND,page);
        }
        else{
            return new ResponseData(ExceptionMsg.NOMORE,"没有更多了");
        }

    }

    /**
     * 通过id返回单个复诊配药
     * @param consult
     * @return
     */
    @GetMapping("findById")
    public ResponseData findById(@RequestParam(value = "consult",defaultValue = "") Integer consult ){
        if(consult == null){
            return new ResponseData(ExceptionMsg.FAILED,"查找条件为空");
        }
        return new ResponseData(ExceptionMsg.SUCCESS,consultAskMapper.findByConsult(consult));
    }

    /**
     * 添加复诊配药
     * @param consultAskEntity
     * @return
     */
    @PostMapping("add")
    public ResponseData addConsult(@RequestBody ConsultAskEntity consultAskEntity){
        if(consultAskEntity==null){
            return new ResponseData(ExceptionMsg.FAILED,"数据为空");
        }
        try{
            Timestamp d = new Timestamp(System.currentTimeMillis());
            consultAskEntity.setCreateTime(d);
            consultAskEntity.setAcceptTime(d);
            consultAskEntity.setFinishTime(null);
            consultAskRepository.save(consultAskEntity);
            goEasy.publish("d"+consultAskEntity.getDoctorId(), consultAskEntity.getDoctorName()+",您有新的复诊配药申请，请及时处理",new PublishListener(){
                @Override
                public void onSuccess() {
                    System.out.println("Publish success.");
                }

                @Override
                public void onFailed(GoEasyError error) {
                    System.out.println("Failed to Publish message, error:" + error.getCode() + " , " + error.getContent());
                }
            });
            return new ResponseData(ExceptionMsg.SUCCESS,"添加成功");
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }

    }

    /**
     * 完成复诊配药
     * @param map1
     * @return
     */
    @PostMapping("finish")
    public ResponseData finishConsult(@RequestBody Map<String,Object> map1){
        Date time = new Date();
        if(map1==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入数据为空");
        }
        int consult = Integer.parseInt((String) map1.get("consultId"));
        try{
            List<PrescriptionInfoEntity> list  =  precriptionMapper.findByConsultStatus(consult,"1");
            ConsultAskEntity consultAskEntity = consultAskMapper.findByConsult(consult);
            if(list.size()!=0){
                consultAskMapper.finishConsult(new Timestamp(time.getTime()),consult);
                goEasy.publish("u"+consultAskEntity.getCreateUserId(), consultAskEntity.getPersonName()+","+consultAskEntity.getDoctorName()+"医生已为您开具新处方，请及时查看",new PublishListener(){
                    @Override
                    public void onSuccess() {
                        System.out.println("Publish success.");
                    }

                    @Override
                    public void onFailed(GoEasyError error) {
                        System.out.println("Failed to Publish message, error:" + error.getCode() + " , " + error.getContent());
                    }
                });
                return new ResponseData(ExceptionMsg.SUCCESS,"完成接诊");
            }
            else{
                return new ResponseData(ExceptionMsg.FAILED,"请先提交药方");
            }
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }

    }

    /**
     * 通过用户id查找其复诊申请
     * @return
     */
    @GetMapping("showConsult")
    public ResponseData findConsultByUser(@RequestParam(value = "userId",defaultValue = "")Integer user,@RequestParam(value = "start",defaultValue = "")Integer start,@RequestParam(value = "size",defaultValue = "10")Integer size,@RequestParam(value = "type",defaultValue = "")Integer type){
        if(user==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入数据为空");
        }
        try {
           PageHelper.startPage(start,size,"create_time asc");
           //SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
           List<ConsultAskEntity> list =   consultAskMapper.findByUser(user,type);
            PageInfo<ConsultAskEntity> page =new PageInfo<>(list);
            return new ResponseData(ExceptionMsg.SUCCESS,page);
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }

    /**
     * 驳回医已完成的复诊配药
     * @param map1
     * @return
     */
    @PostMapping("rejectConsult")
    public ResponseData rejectConsult(@RequestBody Map<String,Integer> map1){
        if(map1==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入为空");
        }
        try{
            int consult = map1.get("consult");
            consultAskMapper.rejectConsult(consult);
            return new ResponseData(ExceptionMsg.SUCCESS,"修改成功");
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }
}
