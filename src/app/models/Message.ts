export class Message {
    public msg: string;
    public from: string;
    public time: Date;

    public constructor(msg: string, from: string, time: Date) {
        this.msg = msg;
        this.from = from;
        this.time = time;
    }
}