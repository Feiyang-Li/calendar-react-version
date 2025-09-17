// the promp when you trying to store date
import styles from "./StorePromp.module.css";
import classNames from "classnames";
import Dialog from "../shared/scripts/dialog";
import { today } from "../shared/scripts/date";
import { X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
export default function StorePromp({ single, open, onClose, storage }) {
  const initialForm = {
    uid: 0, // 0 as anonymous
    date: today(),
    start: 0,
    end: 0,
    title: "",
    type: "",
    color: "",
    comment: "",
    recordDate: today(),
  };
  const [formData, setFormData] = useState(initialForm);
  const [storeSingle, setStoreSingle] = single;
  useEffect(() => {
    setFormData(initialForm);
  }, [open]);

  // save is implemented here
  function onSave(formData) {
    storage.savingItems(formData);
    setStoreSingle(!storeSingle);
    setFormData(initialForm);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    let val = value;
    if (name === "start") {
      val = parseInt(value, 10);
    }
    if (name === "end") {
      val = parseInt(value, 10); 
    }
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };
  const handleClose = (e) => {
    e.preventDefault();
    setFormData(initialForm);
    onClose();
  }


  return (
    <Dialog
      open={open}
      onClose={onClose}
      className={classNames(
        "Cal__dialog",
        "Cal__dialog--middle",
        styles.storeDialog
      )}
    >
      <div className={styles.dialog__wrapper}>
        <div className={styles.dialog__header}>
          <h2 className={styles.dialog__title}>Create event</h2>
          <button
            className={classNames(
              "Cal__button",
              "Cal__button--icon",
              "Cal__button--secondary"
            )}
            onClick={handleClose}
          >
            <X />
          </button>
        </div>
        <div className={"dialog__content"}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__fields}>
              <div className={styles.form__field}>
                <label className={styles.form__label}>Title</label>
                <input
                  className={styles.input}
                  name="title"
                  type="text"
                  placeholder="work"
                  required
                  autoFocus
                  onChange={handleChange}
                ></input>
              </div>
              <div className={styles.form__field}>
                <label className={styles.form__label}>Date</label>
                <input
                  className={styles.input}
                  name="date"
                  type="date"
                  required
                  onChange={handleChange}
                ></input>
              </div>
              <div className={styles.form__split}>
                <div className={styles.form__field}>
                  <label className={styles.form__label} htmlFor="start">
                    Start time
                  </label>
                  <div className={styles.select}>
                    <select
                      className={styles.select__select}
                      name="start"
                      onChange={handleChange}
                    >
                      <option value={0}>12:00 AM</option>
                      <option value={30}>12:30 AM</option>
                      <option value={60}>1:00 AM</option>
                      <option value={90}>1:30 AM</option>
                      <option value={120}>2:00 AM</option>
                      <option value={150}>2:30 AM</option>
                      <option value={180}>3:00 AM</option>
                      <option value={210}>3:30 AM</option>
                      <option value={240}>4:00 AM</option>
                      <option value={270}>4:30 AM</option>
                      <option value={300}>5:00 AM</option>
                      <option value={330}>5:30 AM</option>
                      <option value={360}>6:00 AM</option>
                      <option value={390}>6:30 AM</option>
                      <option value={420}>7:00 AM</option>
                      <option value={450}>7:30 AM</option>
                      <option value={480}>8:00 AM</option>
                      <option value={510}>8:30 AM</option>
                      <option value={540}>9:00 AM</option>
                      <option value={570}>9:30 AM</option>
                      <option value={600}>10:00 AM</option>
                      <option value={630}>10:30 AM</option>
                      <option value={660}>11:00 AM</option>
                      <option value={690}>11:30 AM</option>
                      <option value={720}>12:00 PM</option>
                      <option value={750}>12:30 PM</option>
                      <option value={780}>1:00 PM</option>
                      <option value={810}>1:30 PM</option>
                      <option value={840}>2:00 PM</option>
                      <option value={870}>2:30 PM</option>
                      <option value={900}>3:00 PM</option>
                      <option value={930}>3:30 PM</option>
                      <option value={960}>4:00 PM</option>
                      <option value={990}>4:30 PM</option>
                      <option value={1020}>5:00 PM</option>
                      <option value={1050}>5:30 PM</option>
                      <option value={1080}>6:00 PM</option>
                      <option value={1110}>6:30 PM</option>
                      <option value={1140}>7:00 PM</option>
                      <option value={1170}>7:30 PM</option>
                      <option value={1200}>8:00 PM</option>
                      <option value={1230}>8:30 PM</option>
                      <option value={1260}>9:00 PM</option>
                      <option value={1290}>9:30 PM</option>
                      <option value={1320}>10:00 PM</option>
                      <option value={1350}>10:30 PM</option>
                      <option value={1380}>11:00 PM</option>
                      <option value={1410}>11:30 PM</option>
                    </select>

                  </div>
                </div>
                <div className={styles.form__field}>
                  <label className={styles.form__label} htmlFor="end">
                    End time
                  </label>
                  <div className={styles.select}>
                    <select
                      className={styles.select__select}
                      name="end"
                      onChange={handleChange}
                    >
                      <option value={0}>12:00 AM</option>
                      <option value={30}>12:30 AM</option>
                      <option value={60}>1:00 AM</option>
                      <option value={90}>1:30 AM</option>
                      <option value={120}>2:00 AM</option>
                      <option value={150}>2:30 AM</option>
                      <option value={180}>3:00 AM</option>
                      <option value={210}>3:30 AM</option>
                      <option value={240}>4:00 AM</option>
                      <option value={270}>4:30 AM</option>
                      <option value={300}>5:00 AM</option>
                      <option value={330}>5:30 AM</option>
                      <option value={360}>6:00 AM</option>
                      <option value={390}>6:30 AM</option>
                      <option value={420}>7:00 AM</option>
                      <option value={450}>7:30 AM</option>
                      <option value={480}>8:00 AM</option>
                      <option value={510}>8:30 AM</option>
                      <option value={540}>9:00 AM</option>
                      <option value={570}>9:30 AM</option>
                      <option value={600}>10:00 AM</option>
                      <option value={630}>10:30 AM</option>
                      <option value={660}>11:00 AM</option>
                      <option value={690}>11:30 AM</option>
                      <option value={720}>12:00 PM</option>
                      <option value={750}>12:30 PM</option>
                      <option value={780}>1:00 PM</option>
                      <option value={810}>1:30 PM</option>
                      <option value={840}>2:00 PM</option>
                      <option value={870}>2:30 PM</option>
                      <option value={900}>3:00 PM</option>
                      <option value={930}>3:30 PM</option>
                      <option value={960}>4:00 PM</option>
                      <option value={990}>4:30 PM</option>
                      <option value={1020}>5:00 PM</option>
                      <option value={1050}>5:30 PM</option>
                      <option value={1080}>6:00 PM</option>
                      <option value={1110}>6:30 PM</option>
                      <option value={1140}>7:00 PM</option>
                      <option value={1170}>7:30 PM</option>
                      <option value={1200}>8:00 PM</option>
                      <option value={1230}>8:30 PM</option>
                      <option value={1260}>9:00 PM</option>
                      <option value={1290}>9:30 PM</option>
                      <option value={1320}>10:00 PM</option>
                      <option value={1350}>10:30 PM</option>
                      <option value={1380}>11:00 PM</option>
                      <option value={1410}>11:30 PM</option>
                    </select>

                  </div>
                </div>
                <div className={styles.form__field}>
                  <label className={styles.form__label} htmlFor="color">
                    Color
                  </label>
                  <div className={styles.colorSelect}>
                    <label
                      className={styles.colorSelect__item}
                      style={{ "--color-select-item-color": "#2563eb" }}
                    >
                      <input
                        className={styles.colorSelect__input}
                        type="radio"
                        name="color"
                        value="#2563eb"
                        defaultChecked
                        onChange={handleChange}
                      />
                      <div className={styles.colorSelect__color}>
                        <div className={styles.colorSelect__colorInner}></div>
                      </div>
                    </label>

                    <label
                      className={styles.colorSelect__item}
                      style={{ "--color-select-item-color": "#ea580c" }}
                    >
                      <input
                        className={styles.colorSelect__input}
                        type="radio"
                        name="color"
                        value="#ea580c"
                        onChange={handleChange}
                      />
                      <div className={styles.colorSelect__color}>
                        <div className={styles.colorSelect__colorInner}></div>
                      </div>
                    </label>

                    <label
                      className={styles.colorSelect__item}
                      style={{ "--color-select-item-color": "#16a34a" }}
                    >
                      <input
                        className={styles.colorSelect__input}
                        type="radio"
                        name="color"
                        value="#16a34a"
                        onChange={handleChange}
                      />
                      <div className={styles.colorSelect__color}>
                        <div className={styles.colorSelect__colorInner}></div>
                      </div>
                    </label>

                    <label
                      className={styles.colorSelect__item}
                      style={{ "--color-select-item-color": "#7c3aed" }}
                    >
                      <input
                        className={styles.colorSelect__input}
                        type="radio"
                        name="color"
                        value="#7c3aed"
                        onChange={handleChange}
                      />
                      <div className={styles.colorSelect__color}>
                        <div className={styles.colorSelect__colorInner}></div>
                      </div>
                    </label>

                    <label
                      className={styles.colorSelect__item}
                      style={{ "--color-select-item-color": "#e11d48" }}
                    >
                      <input
                        className={styles.colorSelect__input}
                        type="radio"
                        name="color"
                        value="#e11d48"
                        onChange={handleChange}
                      />
                      <div className={styles.colorSelect__color}>
                        <div className={styles.colorSelect__colorInner}></div>
                      </div>
                    </label>
                  </div>
                </div>
                <div className={styles.form__field}>
                  <select
                    className={styles.select__select}
                    name="type"
                    onChange={handleChange}
                  >
                    <option value="study">study</option>
                    <option value="work">work</option>
                    <option value="hobbit">hobbit</option>
                    <option value="event">event</option>
                  </select>
                </div>
                <div className={styles.form__field}>
                  <label className={styles.form__label} htmlFor="comment">
                    Comment
                  </label>
                  <textarea
                    className={styles.input}
                    name="comment"
                    placeholder=""
                    onChange={handleChange}
                    rows={4}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={"dialog__end"}>
              <button
                type="submit"
                className={classNames(
                  "Cal__button",
                  "Cal__button--primary",
                  styles.submitButton
                )}
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleClose}
                className={classNames(
                  "Cal__button",
                  "Cal__button--secondary",
                  styles.closeButton
                )}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
}
