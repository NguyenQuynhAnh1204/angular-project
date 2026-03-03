

// Để thực hiện nguyên tắc DIP ta sẽ có như sau:


class LoggerInformation1 {
    public showMess() {
        console.log('Show information')
    }
}


class ShowMessage1 {
    public message = new LoggerInformation1()

    public showMess() {
        this.message.showMess();
    }
}


// Đang thấy được rằng ShowMessage đang phụ thuộc hoàn toàn vào LoggerInformatio
// Giả sử bạn muốn thay LoggerInformation bằng LoggerWarning thì bạn phải vào tận conde của ShowMessage để sửa
// => sai nguyên tắc 
// => hai class không phụ thuộc vào nhau mà phải phụ thuộc vào một abstraction 

interface IMessage {
    showMess(): void;
}


class LoggerInformation2 implements IMessage {
     public showMess() {
        console.log('Message: Information')
    }
}

class LoggerWarning2 implements IMessage {
    public showMess() {
        console.log("Message: Warning")
    }
}

class ShowMessage2 {
    constructor(private mess: IMessage) {}

    public showMess() {
        this.mess.showMess();
    }
}


const inf = new LoggerInformation2()
const warn = new LoggerWarning2()

const mess = new ShowMessage2(inf)
mess.showMess()


// như vậy thay vì phải tạo trực tiếp một class bên trong show message thì cách làm trên đã đưa được sự phụ thuộc ra ngoài
// ShowMessage chỉ biết sẽ nhận vào một abstraction là IMessage và sẽ không biết cách tạo như thế nào => giảm sự ràng buộc. 