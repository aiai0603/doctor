package com.example.demo.controller;

import com.example.demo.entity.BaseDrugEntity;
import com.example.demo.mapper.DrugMapper;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("drug")
@RequiredArgsConstructor
@CrossOrigin(origins = "*",maxAge = 3600)
public class DrugController {
    protected Response result(ExceptionMsg msg){
        return new Response(msg);
    }
    protected Response result(){
        return new Response();
    }

    @Autowired
    DrugMapper drugMapper;

    @GetMapping("queryAll")
    public ResponseData FuzzyQuery(@RequestParam(value = "start",defaultValue = "") Integer start,@RequestParam(value = "condition",defaultValue = "") String search){
        PageHelper.startPage(start,10,"drug_id asc");
        List<BaseDrugEntity> list = drugMapper.findByIndex(search);
        PageInfo<BaseDrugEntity> page = new PageInfo<>(list);
        if(start<=page.getPages()){
            return new ResponseData(ExceptionMsg.SUCCESS,page);
        }
        else{
            return new ResponseData(ExceptionMsg.NOMORE,"没有更多了");
        }
    }

    @GetMapping("allFrequency")
    public ResponseData findAllFrequency(){
        return new ResponseData(ExceptionMsg.SUCCESS,drugMapper.findFrequency());
    }

    @GetMapping("allUsage")
    public ResponseData findAllUsage(){
        return new ResponseData(ExceptionMsg.SUCCESS,drugMapper.findUsage());
    }

    @GetMapping("index")
    public ResponseData findByDrugId(@RequestParam("drugId") Integer drugId){
        BaseDrugEntity drug = new BaseDrugEntity();
        drug = drugMapper.findByDrugId(drugId);
        if(drug==null){
            return new ResponseData(ExceptionMsg.FAILED,"未查询到药品");
        }
        return new ResponseData(ExceptionMsg.FIND,drug);
    }
}
