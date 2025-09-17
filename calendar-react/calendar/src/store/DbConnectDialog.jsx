import { useState, useEffect, useMemo } from "react";
import styles from "./DbConnectDialog.module.css";
import Dialog from "../shared/scripts/dialog";
import classNames from 'classnames';

export default function DbConnectionDialog({ selectedDate, startPoint, endPoint, open, onClose, onSave }) {
  const [formData, setFormData] = useState({
    user: "",
    host: "localhost",
    database: "",
    password: "",
    port: 5432,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} className={styles.dbDialog}>
      <div className={styles.container}>
        <h2>Database Connection</h2>
        <form onSubmit={handleSubmit}>
          <label>
            User:
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Host:
            <input
              type="text"
              name="host"
              value={formData.host}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Database:
            <input
              type="text"
              name="database"
              value={formData.database}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Port:
            <input
              type="number"
              name="port"
              value={formData.port}
              onChange={handleChange}
              required
            />
          </label>

          <div style={styles.dbDialog__ButtonContainer}>
            <button type="submit" className={classNames("Cal__button", "Cal__button--primary", styles.submitButton)}>Save</button>
            <button type="button" onClick={onClose} className={classNames("Cal__button", ".Cal__button--secondary", styles.closeButton)}>Cancel</button>
          </div>
        </form>
      </div>
    </Dialog>
  );
}
