const inquirer = require('inquirer')
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
add()