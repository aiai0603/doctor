package com.example.demo.controller;

import com.example.demo.entity.BaseDiagnosisEntity;
import com.example.demo.mapper.DiagnosisMapper;
import com.example.demo.repository.DiagnosisRepository;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    @Autowired
    DiagnosisRepository diagnosisRepository;

    /**
     * 返回所有的疾病信息
     * @param start
     * @return
     */
    @GetMapping("queryAll")
    public ResponseData findAll(@RequestParam(value = "start",defaultValue = "") Integer start,@RequestParam(value = "size",defaultValue = "10") Integer size,@RequestParam(value = "condition",defaultValue = "")String search){
        if(start==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入为空");
        }
        try{
            PageHelper.startPage(start,size,"diagnosis_id asc");
            List<BaseDiagnosisEntity> list = diagnosisMapper.findByConditon(search);
            PageInfo<BaseDiagnosisEntity> page = new PageInfo<>(list);
            if(page.getSize()==0){
                return new ResponseData(ExceptionMsg.ISNULL,page);
            }
            if(start<=page.getPages()){
                return new ResponseData(ExceptionMsg.SUCCESS,page);
            }
            else {
                return new ResponseData(ExceptionMsg.NOMORE,"没有更多了");
            }
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }

    }

    /**
     * 通过id返回单个疾病信息
     * @param diagnosis
     * @return
     */
    @GetMapping("findDiagnose")
    public ResponseData findById(@RequestParam("diagnosis")Integer diagnosis){
        if(diagnosis==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入为空");
        }
        try{
            BaseDiagnosisEntity baseDiagnosisEntity = new BaseDiagnosisEntity();
            if(diagnosis==-1){
                return new ResponseData(ExceptionMsg.SUCCESS,baseDiagnosisEntity);
            }
            baseDiagnosisEntity = diagnosisMapper.findById(diagnosis);
            return new ResponseData(ExceptionMsg.SUCCESS,baseDiagnosisEntity);
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }

    /**
     * 添加/修改疾病信息
     * @param baseDiagnosisEntity
     * @return
     */
    @PostMapping("addDiagnosis")
    public ResponseData addDiagnosis(@RequestBody BaseDiagnosisEntity baseDiagnosisEntity){
        if(baseDiagnosisEntity==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入为空");
        }
        try{
            if(diagnosisMapper.findByDiseases(baseDiagnosisEntity.getDiseasesId())!=null){
                return new ResponseData(ExceptionMsg.FAILED,"该疾病ID已存在");
            }
            diagnosisRepository.save(baseDiagnosisEntity);
            return new ResponseData(ExceptionMsg.SUCCESS,"添加成功");
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }

    /**
     * 删除疾病
     * @param map1
     * @return
     */
    @PostMapping("deleteDiagnosis")
    public ResponseData deleteDiagnosis(@RequestBody Map<String,Integer> map1){
        if(map1==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入为空");
        }
        try{
            diagnosisMapper.deleteById(map1.get("diagnosisId"));
            return new ResponseData(ExceptionMsg.SUCCESS,"删除成功");
        }catch(Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }
}
