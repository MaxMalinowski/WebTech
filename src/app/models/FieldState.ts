export class FieldState {
    public ok: boolean;
    public value: string;
    public border: string;
    public msg: string;

    public constructor(ok=false, value='', border='', msg='') {
        this.ok = ok
        this.value = value
        this.border = border
        this.msg = msg
    }
  }