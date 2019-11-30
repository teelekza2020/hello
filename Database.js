import * as firebase from 'firebase';
import '@firebase/firestore';

const config = {
  apiKey: "AIzaSyClGbIxznD3EsDp-p_vMt3w_KvK4G-Fdok",
  authDomain: "test-b1384.firebaseapp.com",
  databaseURL: "https://test-b1384.firebaseio.com",
  projectId: "test-b1384",
  storageBucket: "test-b1384.appspot.com",
  messagingSenderId: "515720845780",
  appId: "1:515720845780:web:d67e0a5255010a04d5de41",
  measurementId: "G-C7KC4VN8QY"
};

var db = [];
class Database{

  constructor() {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
          console.log("firebase apps initializeApp");
    } else {
        console.log("firebase apps already running...");
    }
  }

  getAccount=async()=>{

  }


  async readOnce(id,read_Account_success,read_Account_fail)
  {
    let getDocs = firebase.firestore().collection('Account').doc(id).get().
    then(doc=>{
      if(doc.exists)
      {
        read_Account_success(doc.data());
      }
      else {
        read_Account_fail();
      }
    }).catch(read_Account_fail());


  }

  async readAll(read_Account_success,read_Account_fail)
  {
    let getDocs = firebase.firestore().collection('Account').get().
    then(snapshot=>{
      if(snapshot.emtry)
      {

        read_Account_fail();
        return;
      }
      snapshot.forEach(doc=>{
        read_Account_success(doc.data())
        })
    })
    .catch(read_Account_fail());
  }
  async readMessage(read_Account_success,read_Account_fail)
  {
    let getDocs = firebase.firestore().collection('Message').orderBy('time').onSnapshot(
      snapshot=>{
        if(snapshot.emtry)
        {
          read_Account_fail();
          return;
        }
        snapshot.forEach(doc=>{
          if(db.length == 0)
          {
            db.push(doc.id)
            read_Account_success(doc.data())
          }
          else {
            var check = 0
            for(i=0;i<db.length;i++)
            {
              if(doc.id == db[i])
              {
                check = 1;
              }
            }
            if(check == 0)
            {
              db.push(doc.id)
              read_Account_success(doc.data())
            }
          }
          })
        }
    ).catch(read_Account_fail());
  }
  async readListening(read_Account_success,read_Account_fail)
  {
    let getDocs = firebase.firestore().collection('Account').onSnapshot(
      snapshot=>{
        if(snapshot.emtry)
        {
          read_Account_fail();
          return;
        }
        snapshot.forEach(doc=>{
          if(db.length == 0)
          {
            db.push(doc.id)
            read_Account_success(doc.data())
          }
          else {
            var check = 0
            for(i=0;i<db.length;i++)
            {
              if(doc.id == db[i])
              {
                check = 1;
              }
            }
            if(check == 0)
            {
              db.push(doc.id)
              read_Account_success(doc.data())
            }
          }
          })
        }
    ).catch(read_Account_fail());
  }
  async deleteAccount(id,delete_Account_success,delete_Account_fail)
  {
    firebase.firestore().collection("Account").doc(id).delete().then(ref=>{delete_Account_success()}).catch(delete_Account_fail());

  }

  async updateAccount(id,Account,update_Account_success,update_Account_fail)
  {
    firebase.firestore().collection("Account").doc(id).update(Account).then(ref=>{update_Account_success()}).catch(update_Account_fail());
  }


  async sendData(Data,add_Message_success,add_Message_fail)
  {
    firebase.firestore().collection("Message").add(Data).then(ref=>{add_Message_success(ref.id)}).catch(add_Message_fail());
  }

  async createAccount(Account,add_Account_success,add_Account_fail)
  {
    firebase.firestore().collection('GraphSocial').get().then(snapshot=>{
      var check = 0;
      snapshot.forEach(doc=>{
        if(Account.UserName == doc.id)
          check++;
      });
      if(check > 0){
        add_Account_fail();
      }
      else{
        firebase.firestore().collection("GraphSocial").doc(Account.UserName).set(Account);
        add_Account_success();
      }
    });
  }

  async checkAccount(Account,check_Account_success,check_Account_fail)
  {
    let getDocs = firebase.firestore().collection('GraphSocial').doc(Account.UserName).get().
    then(doc=>{
      if(doc.exists)
      {
        check_Account_success(doc.data());
      }
      else {
        check_Account_fail();
      }
    })
  }

  async createPost(user,text,Post_success,Post_fail)
  {
    var Message;
    firebase.firestore().collection('GraphSocial').doc(user).get().then(doc=>{
      Message = {
        FirstName : doc.data().FirstName,
        Message : text,
      }
    });
    firebase.firestore().collection('Feed').get().then(snapshot=>{
      var seq,com = "";
      snapshot.forEach(doc=>{
        seq = doc.id;
      });
      seq = String(Number(seq)+1);
      while(seq.length<150){
        seq = "0"+seq;
      }
      while(com.length<150){
        com += "0";
      }
      firebase.firestore().collection("Feed").doc(seq).set(Message);
      MessageCom = {
        Message : '',
        FirstName : '',
      }
      firebase.firestore().collection("Feed/"+seq+"/Comment").doc(com).set(MessageCom);
      Post_success();
    });
  }

  async readPost(updateFeed)
  {
    firebase.firestore().collection('Feed').get().then(snapshot=>{
      var datas = [],r=0, arr =[], arr2=[];
      snapshot.forEach(doc=>{
        datas =[];
        if(r!=0){
          datas.push(doc.id,doc.data());
          arr.push(datas);
        }
        r++;
      });
      datas =[];
      for(var i=1;i<r;i++){
        var x = arr.pop();
        datas.push(x);
      }
      updateFeed(datas);
    });
  }

  async createComment(IDPost,user,text,Comment_Success)
  {
    var Comment;
    firebase.firestore().collection('GraphSocial').doc(user).get().then(doc=>{
      Comment = {
        FirstName : doc.data().FirstName,
        Message : text,
      }
    });
    firebase.firestore().collection('Feed/'+IDPost+'/Comment').get().then(snapshot=>{
      var seq;
      snapshot.forEach(doc=>{
        seq = doc.id;
      });
      seq = String(Number(seq)+1);
      while(seq.length<150){
        seq = "0"+seq;
      }
      firebase.firestore().collection('Feed/'+IDPost+'/Comment').doc(seq).set(Comment);
      Comment_Success();
    });
  }

  async readComment(IDPost,updateComment)
  {
    firebase.firestore().collection('Feed/'+IDPost+'/Comment').get().then(snapshot=>{
      var datas = [],r=0;
      snapshot.forEach(doc=>{
        if(r!=0){
          datas.push(doc.data());
        }
        r++;
      });
      updateComment(datas);
    });
  }

  async readPerson(user,updatePerson)
  {
    firebase.firestore().collection('GraphSocial').get().then(snapshot=>{
      var datas = [],r=0;
      snapshot.forEach(doc=>{
        if(r!=0 && doc.id!=user){
          datas.push(doc.data());
        }
        r++;
      });
      updatePerson(datas);
    });
  }

  async addFriends(user,Friend,add_Success)
  {
    var docid = "";
    while(docid.length<200){
      docid += "0";
    }
    Message = {
      Message : '',
      Name : '',
    }
    firebase.firestore().collection('GraphSocial/'+user.UserName+'/Friends').doc(Friend.UserName).set(Friend);
    firebase.firestore().collection('GraphSocial/'+Friend.UserName+'/Friends').doc(user.UserName).set(user);
    firebase.firestore().collection('GraphSocial/'+user.UserName+'/Friends/'+Friend.UserName+'/Chat').doc(docid).set(Message);
    firebase.firestore().collection('GraphSocial/'+Friend.UserName+'/Friends/'+user.UserName+'/Chat').doc(docid).set(Message);
  }

  async deleteFriends(user,Friend,delete_Success){
    firebase.firestore().collection('GraphSocial/'+user.UserName+'/Friends').doc(Friend.UserName).delete();
    firebase.firestore().collection('GraphSocial/'+Friend.UserName+'/Friends').doc(user.UserName).delete();
  }

  async readMyData(user,dataFromMe_success){
    firebase.firestore().collection('GraphSocial').doc(user).get().then(doc=>{
      dataFromMe_success(doc.data());
    });
  }

  async readFriends(user,updateFriends)
  {
    firebase.firestore().collection('GraphSocial/'+user+'/Friends').get().then(snapshot=>{
      var datas = [];
      snapshot.forEach(doc=>{
        datas.push(doc.data());
      });
      updateFriends(datas);
    });
  }

  async readChatFriends(user,friend,updateChats){
    firebase.firestore().collection('GraphSocial/'+user.UserName+'/Friends/'+friend.UserName+'/Chat').get().then(snapshot=>{
      var datas = [],r=0,arr=[];
      snapshot.forEach(doc=>{
        if(r!=0){
          if(doc.data().Name == user.FirstName){
            arr.push(1,doc.data());
            datas.push(arr);
          }
          else if(doc.data().Name == friend.FirstName){
            arr.push(2,doc.data());
            datas.push(arr);
          }
        }
        r++;
      });
      updateChats(datas);
    });
  }

  async addChat(user,friend,text){
    firebase.firestore().collection('GraphSocial/'+user.UserName+'/Friends/'+friend.UserName+'/Chat').get().then(snapshot=>{
      var x;
      snapshot.forEach(doc=>{
        x = doc.id;
        console.log(x);
      });
      x = String(Number(x)+1);
      while(x.length < 200){
        x = "0" + x;
      }
      Chats = {
        Message : text,
        Name : user.FirstName
      }
      firebase.firestore().collection('GraphSocial/'+user.UserName+'/Friends/'+friend.UserName+'/Chat').doc(x).set(Chats);
      firebase.firestore().collection('GraphSocial/'+friend.UserName+'/Friends/'+user.UserName+'/Chat').doc(x).set(Chats);
    });
  }

  async updateProfile(user,Account,update_success){
    firebase.firestore().collection('GraphSocial').doc(user).update(Account).then(ref=>{update_success()});
  }

  /*async uploadImage(uri,user){
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase.storage().ref().child("User/"+user);
    return ref.put(blob);
  }*/
  async uploadImage(uri, user, success_callback, fail_callback,uploading_callback)
  {
    const response = await fetch(uri);
    const blob = await response.blob();

    var uploadTask = firebase.storage().ref('User').child(user).put(blob);

    uploadTask.on('state_changed', (snapshot)=>{
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log('Upload is '+progress+'% done');
      uploading_callback(progress);
    },(error)=>{
      fail_callback(error.message);
    },async ()=>{
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=>{
          success_callback(downloadURL);
      });
    });
  }

}

const database = new Database();
export default database;
