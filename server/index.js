const express=require('express')
const app=express()
const cors=require('cors')
const mysql=require('mysql2')
const db=mysql.createConnection({
    user : 'root',
    host:'localhost',
    password:'1234',
    database:'aqi_project'
})

app.use(cors())
app.use(express.json())

app.post('/form_submission',(request,response)=>{
    console.log('hi')
    const organization_name=request.body.organization_name
    const area = request.body.area 
    const division = request.body.division
    const station_no = request.body.station_no
    const data_type = request.body.data_type
    const data  = request.body.data
    const date  = request.body.date
    let sql=
    'INSERT INTO air_quality_data (organization_name,area,division,station_number,data_type,data_value,date_of_entry) VALUES (?,?,?,?,?,?,?)'
    db.query(sql,[organization_name,area,division,station_no,data_type,data,date],
    (error,results)=>{
        if(error){
            throw error
        }
    })
})

app.get('/get_bar_chart_info',(request,response)=>{
    let sql='SELECT SUBSTRING(date_of_entry,1,4) AS year_name,avg(data_value) AS average FROM air_quality_data GROUP BY substring(date_of_entry,1,4) ORDER BY SUBSTRING(date_of_entry,1,4) '
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})
app.get('/get_box_plot_info',(request,response)=>{
    let sql='SELECT station_number,data_value FROM air_quality_data ORDER BY station_number ;'
    db.query(sql,(error,results)=>{
        if (error){
            throw error
        }else{
            response.send(results)
        }
    })
})

app.listen(3005,()=>{
    console.log('hijdk')
})
app.get('/',(req,res)=>{
    res.send('Hello The server is running')
})