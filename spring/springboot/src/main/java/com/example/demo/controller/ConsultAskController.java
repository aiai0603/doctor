package com.example.demo.controller;


import com.example.demo.entity.ConsultAskEntity;
import com.example.demo.mapper.ConsultAskMapper;
import com.example.demo.repository.ConsultAskRepository;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
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
    @GetMapping("findAll")
    public ResponseData findAll(@RequestParam("type") Integer type,@RequestParam("doctorId") String doctorId,@RequestParam(value = "start", defaultValue = "0") Integer start){
        PageHelper.startPage(start,4,"create_time asc");
        List<ConsultAskEntity> list = consultAskMapper.findAll(doctorId,type);
        PageInfo<ConsultAskEntity> page =new PageInfo<>(list);
        if(start<=page.getPages()){
            return new ResponseData(ExceptionMsg.FIND,page);
        }
        else{
            return new ResponseData(ExceptionMsg.NOMORE,"没有更多了");
        }

    }

    @GetMapping("findById")
    public ResponseData findById(@RequestParam("consult") String consult ){
        return new ResponseData(ExceptionMsg.SUCCESS,consultAskMapper.findByConsult(consult));
    }

    @PostMapping("add")
    public ResponseData addConsult(@RequestBody Map<String,Object> map1){
      ConsultAskEntity consult = new ConsultAskEntity();
      consult.setDeptName((String)map1.get("deptName"));
      consult.setDoctorId((String)map1.get("doctorId"));
      consult.setDoctorName((String)map1.get("doctorName"));
      consult.setDoctorLevelName((String)map1.get("levelName"));
      consult.setCreateUserId((String)map1.get("userId"));
      consult.setPersonName((String)map1.get("personName"));
      consult.setPersonCardType((String) map1.get("cardType"));
      consult.setPersonCardId((String)map1.get("cardId"));
      consult.setPersonGenderName((String)map1.get("gender"));
      consult.setPersonBirthDate((Timestamp)map1.get("birth"));
      consult.setPersonAge((Integer)map1.get("age"));
      consult.setPersonPhoneNo((String)map1.get("phone"));
      consult.setQuestion((String)map1.get("question"));
      consult.setDiagnosis((String)map1.get("diagnosis"));
      consult.setDrugIds((String)map1.get("drugsId"));
      consult.setDrugNames((String)map1.get("drugsName"));
      consult.setPhotoIds((String)map1.get("photo"));
      consult.setConsultStatus((Integer)map1.get("status"));
      consult.setCreateTime((Timestamp)map1.get("createTime"));
      consult.setAcceptTime((Timestamp)map1.get("acceptTime"));
      consult.setFinishTime(null);
      consultAskRepository.save(consult);
      return new ResponseData(ExceptionMsg.SUCCESS,"添加成功");
    }
}
