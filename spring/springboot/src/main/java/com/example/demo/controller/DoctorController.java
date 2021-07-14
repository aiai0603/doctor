package com.example.demo.controller;

import com.example.demo.entity.BaseDoctorEntity;
import com.example.demo.mapper.DoctorMapper;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("doctor")
public class DoctorController {
    protected Response result(ExceptionMsg msg){
        return new Response(msg);
    }
    protected Response result(){
        return new Response();
    }

    @Autowired
    private DoctorMapper doctorMapper;

    @GetMapping("queryAll")
    public ResponseData queryAll(@RequestParam(value = "start",defaultValue = "") Integer start){
        PageHelper.startPage(start,5,"doctor_id asc");
        List<BaseDoctorEntity> list = doctorMapper.findAll();
        PageInfo<BaseDoctorEntity> page = new PageInfo<>(list);
        if(start<=page.getPages()){
            return new ResponseData(ExceptionMsg.SUCCESS,page);
        }
        else {
            return new ResponseData(ExceptionMsg.NOMORE,"没有更多了");
        }
    }
}
