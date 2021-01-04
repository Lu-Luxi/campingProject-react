const express = require('express')
const cors = require('cors');
const mysql = require('mysql')
const morgan = require('morgan');
const createError = require('http-errors');
const multer = require('multer');

const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// 密碼加密 bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


// const path = require('path');

// 引入routes
const indexRouter = require('./routes/index');
const campsRouter = require('./routes/camps');
const accountRouter = require('./routes/account');
const searchRouter = require('./routes/search');
const bookRouter = require('./routes/book');
const dashboardRouter = require('./routes/dashboard');
//使用express
const app = express();

//use static to get photo
app.use(express.static(__dirname + '/public'));

app.use(express.json());
//掛入中介程式
app.use(cors({
  // 要開放給React的port!
  origin: ["http://localhost:3000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
})
);
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    key: "userId",
    secret: "camping",
    resave: false,
    saveUninitialized: true, //強制將未初始化的session存回 session store，未初始化的意思是它是新的而且未被修改。
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);


const db = mysql.createConnection({
  // 127.0.0.1
  host: "localhost",
  user: "root",
  password: "",
  database: "camping",
  // port: 8889
});

app.use(function (req, res, next) {
  // db.connect();
  req.mysql = db;
  req.mysql.queryAsync = function (cmd, params) {
    return new Promise(function (resolve, reject) {
      req.mysql.query(cmd, params, function (err, data) {
        if (err) {
          reject(err)
          console.log(err)
        }
        resolve(data);
      })
    });
  }
  next();
})


// CampOwner post Images
let myStorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "public/campImage"); //保存路徑（須先創建）
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname) //自訂檔名
  }
})

let upload = multer({
  storage: myStorage,
  // limits: { fileSize:  10000000}
}).array('file')


// http://localhost:5000/upload/CampImage/${campId}
//(router, upload接收檔案, callback)
app.post("/upload/CampImage/:campId/:campName/:campPhone/:campAddress/:campAltitude", function (req, res) {
  const campId = req.params.campId;
  const campName = req.params.campName;
  const campPhone = req.params.campPhone;
  const campAddress = req.params.campAddress;
  const campAltitude = req.params.campAltitude;
  // const campGuide = req.params.campGuide;
  // console.log(req.file) single
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    let insertText = 'INSERT INTO `camp photos` (CampId, CampPhoto) VALUES ';
    //先判定files 長度
    // "http://localhost:5000/campImage/" +
    if (req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        if (i < req.files.length - 1) {
          insertText += `(${campId}, 'http://localhost:5000/campImage/${req.files[i].filename}'), `
        } else if (i == req.files.length - 1) {
          insertText += `(${campId}, 'http://localhost:5000/campImage/${req.files[i].filename}')`
        }
        console.log(req.files[i].filename) //取得fileName
      }
      console.log(insertText)
      // 送query1
      await req.mysql.queryAsync(insertText, [])

      const query1 = "UPDATE camps SET CampName=?, CampPhone=?, CampAddress=?, CampAltitude=? WHERE CampId=?"
      //送query2
      const result = await req.mysql.queryAsync(query1, [campName, campPhone, campAddress, campAltitude, campId])
      res.status(200).send(result)

      console.log(req.files)
      // return res.status(200).send(req.files)
    } else {
      //若沒有上傳圖片
      const query1 = "UPDATE camps SET CampName=?, CampPhone=?, CampAddress=?, CampAltitude=? WHERE CampId=?"
      //送query2
      const result = await req.mysql.queryAsync(query1, [campName, campPhone, campAddress, campAltitude, campId])
      res.status(200).send(result)

      console.log(req.files)
      return
      // res.send(err)
    }
    // console.log(req.file)
    // res.send(`上傳成功`)
  })
  // console.log(req.file)  //multiple

})

// 掛入各個路由
app.use('/api', indexRouter);
app.use('/camps/api', campsRouter);
app.use('/account/api', accountRouter);
app.use('/search/api', searchRouter);
app.use('/book/api', bookRouter);
app.use('/dashboard/api', dashboardRouter);
// /api/dashboard,dashboardRouter




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('404 Not Found');
  console.log(`res.locals.message: ${res.locals.message}`)
  console.log(`res.locals.error: ${res.locals.error}`)
});


const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Start at Port: ${PORT}`)
})