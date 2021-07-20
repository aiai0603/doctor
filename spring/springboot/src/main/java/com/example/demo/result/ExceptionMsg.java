package com.example.demo.result;

public enum ExceptionMsg {
    SUCCESS("200", "操作成功"),
    FIND("201", "查找成功"),
    DELETE("202", "删除成功"),
    FAILED("999","操作失败"),
    NOMORE("401","没有更多了"),
    ISNULL("998","返回数据为空"),
    TYPEWRONG("990","类型错误")
    ;
    private ExceptionMsg(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }
    private String code;
    private String msg;

    public String getCode() {
        return code;
    }
    public String getMsg() {
        return msg;
    }


}
