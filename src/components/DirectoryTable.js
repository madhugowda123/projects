import React, { useState, useMemo } from "react";
import SearchBox from "./SearchBox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useSortableData = (users, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { users: sortedUsers, requestSort, sortConfig };
};

const DirectoryTable = (props) => {
  const { users, requestSort, sortConfig } = useSortableData(props.users);
  const { editUser, deleteUser } = props;
  const [searchValue, setSearchValue] = useState("");
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const searchHandler = (value) => {
    setSearchValue(value);
  };

  let updateUsers = users.filter((user) => {
    return Object.keys(user).some((key) =>
      user[key]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

  return (
    <div>
      <div className="container">
        <SearchBox searchHandler={searchHandler} />
        <table>
          <thead>
            <tr>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("education")}
                  className={getClassNamesFor("education")}
                >
                  Education
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("institute")}
                  className={getClassNamesFor("institute")}
                >
                  Institute
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("university")}
                  className={getClassNamesFor("university")}
                >
                  University
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("passingyear")}
                  className={getClassNamesFor("passingyear")}
                >
                  Passing Year
                </button>
              </th>
              <th>
                <button
                  type="button"
                  onClick={() => requestSort("percentage")}
                  className={getClassNamesFor("percentage")}
                >
                  Percentage
                </button>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {updateUsers.length > 0 ? (
              updateUsers.map((user) => (
                <tr key={user.id}>
                  {/* <td>
                     <img
                       src={user.image}
                       alt={user.first_name + " " + user.last_name}
                     />
                 </td>*/}
                  <td>{user.education}</td>
                  <td>{user.institute}</td>
                  <td>{user.university}</td>
                  <td>{user.passingyear}</td>
                  <td>{user.percentage}</td>

                  <td>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        editUser(user);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => deleteUser(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No Users</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DirectoryTable;
