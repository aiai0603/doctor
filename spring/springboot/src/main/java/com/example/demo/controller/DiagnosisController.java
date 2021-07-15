package com.example.demo.controller;

import com.example.demo.entity.BaseDiagnosisEntity;
import com.example.demo.mapper.DiagnosisMapper;
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
@RequestMapping("diagnosis")
public class DiagnosisController {
    protected Response result(ExceptionMsg msg){
        return new Response(msg);
    }
    protected Response result(){
        return new Response();
    }

    @Autowired
    DiagnosisMapper diagnosisMapper;

    @GetMapping("queryAll")
    public ResponseData findAll(@RequestParam(value = "start",defaultValue = "") Integer start){
        PageHelper.startPage(start,5,"diagnosis_id asc");
        List<BaseDiagnosisEntity> list = diagnosisMapper.findAll();
        PageInfo<BaseDiagnosisEntity> page = new PageInfo<>(list);
        if(start<=page.getPages()){
            return new ResponseData(ExceptionMsg.SUCCESS,page);
        }
        else {
            return new ResponseData(ExceptionMsg.NOMORE,"没有更多了");
        }
    }
}
