SELECT
    *
FROM
    (
        SELECT
            NULL AS FirstCleSickName,
            Person.First_Name + ' ' + Person.Last_Name AS FirstRecSickName,
            temp3.EmployeeName
        FROM
            Person
            INNER JOIN (
                SELECT
                    temp2.Sick_NationalCode,
                    Person.First_Name + ' ' + Person.Last_Name AS EmployeeName
                FROM
                    Person
                    INNER JOIN (
                        SELECT
                            employee.NationalCode AS Emp_NationalCode,
                            temp1.Sick_NationalCode
                        FROM
                            employee
                            INNER JOIN (
                                SELECT
                                    Paziresh_Date,
                                    NationalCode AS Sick_NationalCode,
                                    Employee_Id
                                FROM
                                    Sick
                                    INNER JOIN Reception ON Sick.Id = Sick_Id
                                WHERE
                                    Paziresh_Date IN (
                                        SELECT
                                            MIN(Paziresh_Date) AS MinPazireshDate
                                        FROM
                                            Sick
                                            LEFT JOIN Reception ON Sick.Id = Reception.Sick_Id
                                            LEFT JOIN employee ON employee.Id = Reception.Employee_Id
                                        GROUP BY
                                            employee.Id
                                    )
                            ) AS temp1 ON temp1.Employee_Id = employee.Id
                    ) AS temp2 ON temp2.Emp_NationalCode = Person.NationalCode
            ) AS temp3 ON temp3.Sick_NationalCode = Person.NationalCode
        UNION
        SELECT
            Person.First_Name + ' ' + Person.Last_Name AS FirstCleSickName,
            NULL FirstRecSickName,
            temp3.EmployeeName
        FROM
            Person
            INNER JOIN (
                SELECT
                    temp2.Sick_NationalCode,
                    Person.First_Name + ' ' + Person.Last_Name AS EmployeeName
                FROM
                    Person
                    INNER JOIN (
                        SELECT
                            employee.NationalCode AS Emp_NationalCode,
                            temp1.Sick_NationalCode
                        FROM
                            employee
                            INNER JOIN (
                                SELECT
                                    Release_Date,
                                    NationalCode AS Sick_NationalCode,
                                    Employee_Id
                                FROM
                                    Sick
                                    INNER JOIN clearance ON Sick.Id = Sick_Id
                                WHERE
                                    Release_Date IN (
                                        SELECT
                                            MIN(Release_Date) AS MinRelease_Date
                                        FROM
                                            Sick
                                            LEFT JOIN clearance ON Sick.Id = clearance.Sick_Id
                                            LEFT JOIN employee ON employee.Id = clearance.Employee_Id
                                        GROUP BY
                                            employee.Id
                                    )
                            ) AS temp1 ON temp1.Employee_Id = employee.Id
                    ) AS temp2 ON temp2.Emp_NationalCode = Person.NationalCode
            ) AS temp3 ON temp3.Sick_NationalCode = Person.NationalCode
    ) AS X