package com.example.demo.controller;

import com.example.demo.entity.BaseDrugEntity;
import com.example.demo.mapper.DrugMapper;
import com.example.demo.repository.DrugRepository;
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

    @Autowired
    DrugRepository drugRepository;

    /**
     * 以分页形式通过模糊查询条件返回药品信息
     * @param start
     * @param search
     * @return
     */
    @GetMapping("queryAll")
    public ResponseData FuzzyQuery(@RequestParam(value = "start",defaultValue = "") Integer start,@RequestParam(value = "condition",defaultValue = "") String search){
        if(start==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入为空");
        }
        try{
            PageHelper.startPage(start,10,"drug_id asc");
            List<BaseDrugEntity> list = drugMapper.findByIndex(search);
            PageInfo<BaseDrugEntity> page = new PageInfo<>(list);
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
     * 返回所有的用药频次
     * @return
     */
    @GetMapping("allFrequency")
    public ResponseData findAllFrequency(){
        try{
            return new ResponseData(ExceptionMsg.SUCCESS,drugMapper.findFrequency());
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }

    }

    /**
     * 返回所有的用药方式
     * @return
     */
    @GetMapping("allUsage")
    public ResponseData findAllUsage(){
        try{
            return new ResponseData(ExceptionMsg.SUCCESS,drugMapper.findUsage());
        }catch(Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }

    /**
     * 通过id返回单个的药品信息
     * @param drugId
     * @return
     */
    @GetMapping("index")
    public ResponseData findByDrugId(@RequestParam("drugId") Integer drugId){
        if(drugId==null){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
        BaseDrugEntity drug = new BaseDrugEntity();
        try{
            drug = drugMapper.findByDrugId(drugId);
            if(drug==null){
                return new ResponseData(ExceptionMsg.FAILED,"未查询到药品");
            }
            return new ResponseData(ExceptionMsg.FIND,drug);
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }

    }

    /**
     * 添加药品
     * @param baseDrugEntity
     * @return
     */
    @PostMapping("addDrug")
    public ResponseData addDrug(@RequestBody BaseDrugEntity baseDrugEntity){
        if(baseDrugEntity==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入数据为空");
        }
        try {
            drugRepository.save(baseDrugEntity);
            return new ResponseData(ExceptionMsg.SUCCESS,"添加成功");
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }


}
