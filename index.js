const inquirer = require('inquirer')
const cTable = require('console.table')
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Greblat2',
    port: 3306,
    database: 'employee_db'

})

connection.connect((err) => {
    if (err) throw err;

})

const createNew = function () {
    inquirer.prompt(
        { type: raw }
    )
}

const employeeQuery = 'select * from employee'
const employeeCall = connection.query(employeeQuery, (err, res) => {
    return res
})
const roleQuery = 'select * from role'
const roleCall = () => {
    connection.query(roleQuery, (err, res) => {
        return res

    })
}
const add = function () {




    inquirer.prompt(
        {
            type: 'rawlist',
            name: 'choice',
            message: 'What would you like to add?',
            choices: ['Employee', 'Role', 'Department']
        }
    ).then(({ choice }) => {
        console.log([choice])
        if (choice === 'Role') {
            connection.query('select * from department', (err, res) => {
                console.log(res)
                inquirer
                    .prompt(
                        [{
                            type: 'input',
                            name: 'name',
                            message: 'Role Title?',


                        },
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Annual Salary??',
                        },
                        {
                            type: 'rawlist',
                            name: 'department',
                            message: 'What department?',
                            choices: function () {
                                var choicesArr = []
                                for (each of res) {
                                    choicesArr.push(each.name)
                                }
                                return choicesArr
                            }
                        }]
                    ).then(({ name, salary, department }) => {
                        console.log(name, salary, department)
                        for (each of res) {
                            if (each.name === department) {
                                var departmentId = each.id
                            }

                        }
                        connection.query('select id from role', (err, roleRes) => {
                            var Id = roleRes.length + 1;
                            console.log(Id)
                            connection.query('insert into role set ?', {
                                id: Id,
                                title: name,
                                salary: salary,
                                department_id: departmentId
                            },(err)=>{
                                if (err) throw err;
                                console.log('Made the new role in the database!')
                            }
                            )
                        }
                        )



                    })

            })
        }
        else if (choice === 'Employee') {
            console.log('yay Employee')
        }
        else if (choice === 'Department') {
            console.log('yay Department')
        }
        else {
            console.log('nope')
        }
    })
}
const render = function(){
    inquirer
    .prompt(
        {
            type:'rawlist',
            name :'choice',
            message: 'What would you like to render?',
            choices: ['Role','Employee','Department']
        }
    ).then(({choice})=>{
        let choiceLower = choice.toLowerCase()
        let query = `select * from ${choiceLower}`
        connection.query(query,(err,res)=>{
            // console.log(res)
            console.table(res)
        })
        

    })
}
render()