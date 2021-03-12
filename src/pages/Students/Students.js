import React, {useState, useEffect} from 'react';
import styles from './Students.module.css';
import axios from 'axios';

const Students = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [editOpenId, setEditOpenId] = useState(-1);
    const [editName, setEditName] = useState("");

    const [newEmail, setNewEmail] = useState("");
    const [newFullName, setNewFullName] = useState("");

    const [searchEmail, setSearchEmail] = useState("");
    const [isSearchingKey, setIsSearchingKey] = useState(false);

    useEffect(() => {
        axios.get("/college_students")
            .then((res) => {
                console.log(res.data);
                setIsLoading(false);
                setStudents(res.data);
            })
            .catch(() =>{
                setIsLoading(false);
                alert("an error occured, check you are connected with backend");
    });
 }, []);

    const buildStudentsList = () => {
        if (students === null || students.length === 0) {
            return "No students found";
        }
        let studentsList = [];
        console.log(students);
        students.map((student) => {
            studentsList.push(
                <div key={student.id} className={styles.StudentCard}>
                    <div><b>Name:</b> {student.name}</div>
                    <div><b>Email:</b> {student.email}</div>
                    <div className={styles.StudentCardControls}>
                        <p onClick={() => editHandler(student.id, student.name)}>
                            {editOpenId === student.id ? "Cancel" : "Edit"}
                        </p>
                        <p onClick={() => deleteHandler(student.id)}>Delete</p>
                    </div>
                    {
                        editOpenId === student.id ? <div className={styles.EditBar}>
                            <input
                                onChange={onEditChangeHandler}
                                value={editName}
                                className={styles.EditInput}
                                placeholder="Enter new name"/>
                            <button
                                onClick={() => editDoneHandler(student.id)}
                                className={styles.Button}>
                                Done
                            </button>
                        </div> : <></>
                    }
                </div>
            );
        });

        return studentsList;
    };

    const deleteHandler = (id) => {
        axios.delete('/college_students/' + id).then(() => {
            window.location.reload();
        })
        .catch(() => alert("an error occured, check you are connected with backend"));
    };

    const editHandler = (id, name) => {
        setEditName(name);
        setEditOpenId(id);
    };

    const onEditChangeHandler = (e) => {
        setEditName(e.target.value);
    };

    const editDoneHandler = (id) => {
        axios.patch('/college_students/' + id, {name: editName}).then(() => window.location.reload())
        .alert("an error occured, check you are connected with backend");
    };

    const onFullNameEdit = (e) => {
        setNewFullName(e.target.value);
    };  

    const onEmailEdit = (e) => {
        setNewEmail(e.target.value);
    };

    const onAddStudent = () => {
        if (newFullName === "" || newEmail === "") {
            alert("Full name and email is required");
            return;
        }

        axios.post('/college_students', {name: newFullName, email: newEmail}).then(() => {
            window.location.reload();
        }).catch(() => alert("an error occured, check you are connected with backend"));
    };

    const sortStudents = () => {
        const newStudents = [...students];
        setIsLoading(true);
        newStudents.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        setIsLoading(false);
        setStudents(newStudents);
    };

    const onSearchEdit = (e) => {
        setSearchEmail(e.target.value);
    };

    const onSearch = () => {
        setIsSearchingKey(true);
        setIsLoading(true);
        axios.get('/college_students/search?email=' + searchEmail + '&commit=Search').then((res) => {
            setStudents(res.data);
            setIsSearchingKey(false);
            setIsLoading(false);
        }).catch(() => alert("an error occured, check you are connected with backend"));
    };

    return (
        <div className={styles.Container}>
            {!isSearchingKey ? <>
                <div className={styles.AddStudent}>
                    <input
                        onChange={onFullNameEdit}
                        value={newFullName}
                        required={true}
                        className={styles.AddInput}
                        placeholder="Full Name"/>
                    <input
                        onChange={onEmailEdit}
                        value={newEmail}
                        required={true}
                        className={styles.AddInput}
                        placeholder="Email"/>
                    <button onClick={onAddStudent} className={styles.Button}>Add Student</button>
                </div>
                <div className={styles.SearchBar}>
                    <input
                        onChange={onSearchEdit}
                        value={searchEmail}
                        className={styles.SearchInput}
                        placeholder="Search by email"/>
                    <button onClick={onSearch} className={styles.Button}>Search</button>
                    <button onClick={sortStudents} className={styles.Button}>Sort</button>
                </div>
                <div className={styles.StudentsList}>
                    {
                        isLoading ?
                            <h3>Loading...</h3> :
                            <div>
                                {
                                    buildStudentsList()
                                }
                            </div>
                    }
                </div>
            </> : <div className={styles.StudentsList}>
                {
                    isLoading ?
                        <h3>Loading...</h3> :
                        <div>
                            {
                                buildStudentsList()
                            }
                        </div>
                }
            </div>
            }
        </div>
    );
};

export default Students;
