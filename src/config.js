
let def = {}
if(process.env.NODE_ENV === 'production'){
    def = {
        "production": {
            "api" : "http://interim.dev.multidev.com/v1", //"http://localhost:3004"
            // "api" : "http://localhost:5000/v1",
            "base" : "http://interim.dev.multidev.com"
            // "base" : "http://localhost:5000"
        },
        "development": {
            "api": "http://interim.dev.multidev.com/v1", //"http://localhost:3004"
            // "api": "http://localhost:5000/v1",
            "base" : "http://interim.dev.multidev.com"
            // "base" : "http://localhost:5000"
        }
    }
}
else if(process.env.NODE_ENV === 'development'){
    def = {
        "production": {
            "api" : "http://interim.dev.multidev.com/v1", //"http://localhost:3004"
            // "api" : "http://localhost:5000/v1",
            "base" : "http://interim.dev.multidev.com"
            // "base" : "http://localhost:5000"
        },
        "development": {
            "api": "http://interim.dev.multidev.com/v1", //"http://localhost:3004"
            // "api": "http://localhost:5000/v1",
            "base" : "http://interim.dev.multidev.com"
            // "base" : "http://localhost:5000"
        }
    }

}else{

}

//"api" : "http://mdshippinggw.dev.multidev.com/app.php/api", //"http://localhost:3004"
//"base" : "http://mdshippinggw.dev.multidev.com/app.php"

// localhost:5000

export default def;
