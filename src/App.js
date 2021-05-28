import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import DirectoryTable from "./components/DirectoryTable";
import AddUserForm from "./components/AddUserForm";
import EditUserForm from "./components/EditUserForm";
import Pagination from "./components/Pagination";
import Modal from "./components/Modal";
import useModal from "./hooks/useModal";

const App = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(false);
  const initialFormState = {
    id: null,
    education: "",
    institute: "",
    university: "",
    passingyear: "",
    percentage: "",
  };
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const data = [
      {
        id: 1,
        education: "bca",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
      {
        id: 2,
        education: "mca",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
      {
        id: 3,
        education: "civil",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
      {
        id: 4,
        education: "ec",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
      {
        id: 5,
        education: "bsc",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
      {
        id: 1,
        education: "bca",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
      {
        id: 2,
        education: "mca",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
      {
        id: 3,
        education: "civil",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
      {
        id: 4,
        education: "ec",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
      {
        id: 5,
        education: "bsc",
        institute: "pes",
        university: "kuvempu",
        passingyear: 1452,
        percentage: 88,
      },
    ];
    setUsers(data);
  }, []);

  // incrementing ids + adding placeholder image manually
  // TODO: update id and image handling when tying this to a database
  const addUser = (user) => {
    toggle();
    user.id = users.length + 1;
    setUsers([user, ...users]);
  };

  const editUser = (user) => {
    setEditing(true);
    toggle();
    setCurrentUser({
      id: user.id,
      education: user.education,
      institute: user.institute,
      university: user.university,
      passingyear: user.passingyear,
      percentage: user.percentage,
    });
  };

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    toggle();
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  // change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header />
      <div className="container">
        <button className="button-add" onClick={toggle}>
          Add User
        </button>
      </div>
      {editing ? (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={
            <EditUserForm
              setEditing={setEditing}
              currentUser={currentUser}
              updateUser={updateUser}
            />
          }
        />
      ) : (
        <Modal
          isShowing={isShowing}
          hide={toggle}
          content={<AddUserForm addUser={addUser} />}
        />
      )}
      <DirectoryTable
        users={currentUsers}
        editUser={editUser}
        deleteUser={deleteUser}
      />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={users.length}
        paginate={paginate}
      />
    </div>
  );
};

export default App;
