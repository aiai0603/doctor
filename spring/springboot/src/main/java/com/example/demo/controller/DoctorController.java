package com.example.demo.controller;

import com.example.demo.entity.BaseDoctorEntity;
import com.example.demo.mapper.DoctorMapper;
import com.example.demo.repository.DoctorRepository;
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
    @Autowired
    private DoctorRepository doctorRepository;

    /**
     * 返回所有的医生信息
     * @param start
     * @return
     */
    @GetMapping("queryAll")
    public ResponseData queryAll(@RequestParam(value = "start",defaultValue = "") Integer start,@RequestParam(value = "condition",defaultValue = "")String search){
        if(start==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入为空");
        }
        PageHelper.startPage(start,5,"doctor_id asc");
        List<BaseDoctorEntity> list = doctorMapper.findByConditon(search);
        PageInfo<BaseDoctorEntity> page = new PageInfo<>(list);
        if(start<=page.getPages()){
            return new ResponseData(ExceptionMsg.SUCCESS,page);
        }
        else {
            return new ResponseData(ExceptionMsg.NOMORE,"没有更多了");
        }
    }

    /**
     * 添加/修改医生
     */
    @PostMapping("addDoctor")
    public ResponseData addDoctor(@RequestBody BaseDoctorEntity baseDoctorEntity){
        if(baseDoctorEntity==null){
            return new ResponseData(ExceptionMsg.FAILED,"传入数据为空");
        }
        doctorRepository.save(baseDoctorEntity);
        return new ResponseData(ExceptionMsg.SUCCESS,"添加成功");
    }

    /**
     * 删除医生
     * @param map1
     * @return
     */
    @PostMapping("deleteDoctor")
    public ResponseData deleteDoctor(@RequestBody Map<String,Object> map1){
        if(map1==null){
            return new ResponseData(ExceptionMsg.FAILED,"传入数据为空");
        }
        try{
            int doctor = (int) map1.get("doctorId");
            doctorMapper.deleteDoctor(doctor);
            return new ResponseData(ExceptionMsg.SUCCESS,"删除成功");
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }

    }

    /**
     * 通过ID返回单个的医生信息
     * @param doctorId
     * @return
     */
    @GetMapping("findDoctor")
    public ResponseData findById(@RequestParam("doctorId")Integer doctorId){
        if(doctorId==null){
            return new ResponseData(ExceptionMsg.FAILED,"传入数据为空");
        }
        try{
            BaseDoctorEntity baseDoctorEntity ;
            baseDoctorEntity = doctorMapper.findById(doctorId);
            return new ResponseData(ExceptionMsg.SUCCESS,baseDoctorEntity);
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }

}
