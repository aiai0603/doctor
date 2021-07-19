package com.example.demo.controller;

import com.example.demo.entity.BaseAccoutEntity;
import com.example.demo.entity.BaseDoctorEntity;
import com.example.demo.mapper.AccoutMapper;
import com.example.demo.mapper.DoctorMapper;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.DoctorRepository;
import com.example.demo.result.ExceptionMsg;
import com.example.demo.result.Response;
import com.example.demo.result.ResponseData;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
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
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private AccoutMapper accoutMapper;

    /**
     * 返回所有的医生信息
     * @param start
     * @return
     */
    @GetMapping("queryAll")
    public ResponseData queryAll(@RequestParam(value = "start",defaultValue = "") Integer start,@RequestParam(value = "size",defaultValue = "5") Integer size,@RequestParam(value = "condition",defaultValue = "")String search){
        if(start==null){
            return new ResponseData(ExceptionMsg.FAILED,"输入为空");
        }
        try{
            PageHelper.startPage(start,size,"doctor_id asc");
            List<BaseDoctorEntity> list = doctorMapper.findByConditon(search);
            PageInfo<BaseDoctorEntity> page = new PageInfo<>(list);
            if(page.getSize()==0){
                return new ResponseData(ExceptionMsg.ISNULL,page);
            }
            if(start<=page.getPages()){
                return new ResponseData(ExceptionMsg.SUCCESS,page);
            }
            else {
                return new ResponseData(ExceptionMsg.NOMORE,"没有更多了");
            }
        }
        catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }

    /**
     * 添加/修改医生
     */
    @PostMapping("addDoctor")
    public ResponseData addDoctor(@RequestBody Map<String,Object> map1){
        if(map1==null){
            return new ResponseData(ExceptionMsg.FAILED,"传入数据为空");
        }
        try{
                BaseDoctorEntity baseDoctorEntity = new BaseDoctorEntity();
                baseDoctorEntity.setDoctorName((String) map1.get("doctorName"));
                baseDoctorEntity.setAvatarUrl((String)map1.get("avatarUrl"));
                baseDoctorEntity.setDeptName((String)map1.get("deptName"));
                String code = (String)map1.get("levelCode");
                baseDoctorEntity.setLevelCode(code);
                switch(code){
                    case "1" :
                        baseDoctorEntity.setLevelName("主任医师");
                        break;
                    case "2" :
                        baseDoctorEntity.setLevelName("副主任医师");
                        break;
                    case "3" :
                        baseDoctorEntity.setLevelName("主治医师");
                        break;
                    case "4" :
                        baseDoctorEntity.setLevelName("医师");
                        break;
                    default :
                        baseDoctorEntity.setLevelName("医士");
                }
                if((Integer)map1.get("doctorId")==-1){
                    if(accoutMapper.findByPhone((String)map1.get("phone"))==null){
                        Date time = new Date();
                        BaseAccoutEntity baseAccoutEntity = new BaseAccoutEntity();
                        baseAccoutEntity.setCreateTime(new Timestamp(time.getTime()));
                        baseAccoutEntity.setPhoneNo((String)map1.get("phone"));
                        baseAccoutEntity.setUserType("2");
                        accountRepository.save(baseAccoutEntity);
                        int id = accoutMapper.findByPhone((String)map1.get("phone")).getUserId();
                        baseDoctorEntity.setUserId(id);
                        doctorRepository.save(baseDoctorEntity);
                    }
                    else{
                        return new ResponseData(ExceptionMsg.FAILED,"手机号已存在");
                    }
                }
                else {
                    int id = doctorMapper.findById((Integer)map1.get("doctorId")).getUserId();
                    accoutMapper.updateAccout((String)map1.get("phone"),doctorMapper.findById((Integer)map1.get("doctorId")).getUserId());
                    baseDoctorEntity.setDoctorId((Integer)map1.get("doctorId"));
                    baseDoctorEntity.setUserId(id);
                    doctorRepository.save(baseDoctorEntity);
                }
                return new ResponseData(ExceptionMsg.SUCCESS,"添加成功");
        }catch (Exception e){
            throw e;
            //return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }

    }

    /**
     * 修改医生
     * @param baseDoctorEntity
     * @return
     */
    @PostMapping("updateSoctor")
     public ResponseData updateDoctor(@RequestBody BaseDoctorEntity baseDoctorEntity){
        if(baseDoctorEntity==null){
            return new ResponseData(ExceptionMsg.FAILED,"传入数据为空");
        }
        try{
            doctorRepository.save(baseDoctorEntity);
            return new ResponseData(ExceptionMsg.SUCCESS,"添加成功");
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }
    /**
     * 删除医生
     * @param map1
     * @return
     */
    @PostMapping("deleteDoctor")
    public ResponseData deleteDoctor(@RequestBody Map<String,Integer> map1){
        if(map1==null){
            return new ResponseData(ExceptionMsg.FAILED,"传入数据为空");
        }
        try{
            int doctor = map1.get("doctorId");
            accoutMapper.deleteDoctor(doctorMapper.findById(doctor).getUserId());
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
            BaseDoctorEntity baseDoctorEntity = new BaseDoctorEntity();
            if(doctorId==-1){
                return new ResponseData(ExceptionMsg.SUCCESS,baseDoctorEntity);
            }
            baseDoctorEntity = doctorMapper.findById(doctorId);
            String phone = accoutMapper.findByUser(baseDoctorEntity.getUserId()).getPhoneNo();
            Map<String,Object> map1 = new HashMap<>();
            map1.put("doctor",baseDoctorEntity);
            map1.put("phone",phone);
            return new ResponseData(ExceptionMsg.SUCCESS,map1);
        }catch (Exception e){
            return new ResponseData(ExceptionMsg.FAILED,"出现异常");
        }
    }

}
