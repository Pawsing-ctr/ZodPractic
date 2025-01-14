import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import { z } from "zod";
import "./App.css";

// const schemaErrorOptional = { required_error: "Обязательное поле" };

const userSchema = z.object({
  userName: z.string().min(1, "Обязательное поле"),
  sureName: z.string().min(1, "Обязательное поле"),
  patronymic: z.string().optional(),
  telNumber: z.string().min(10, "Номер не полный"),
  email: z.string().email("Неверный формат email"),
  optionTown: z.string(),
});

const newUser = {
  userName: "",
  sureName: "",
  patronymic: "",
  telNumber: "",
  email: "",
  optionTown: "",
};

const App = () => {
  const [newUserObject, setNewUserObject] = useState(newUser);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = userSchema.safeParse(newUserObject);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      console.log("Успешная отправка:", result.data);
      setErrors({});
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>Введите имя</p>
        <input
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, userName: e.target.value })
          }
          placeholder="Имя"
          type="text"
        />
        <p className="error-text">{errors.userName}</p>
        <p>Введите фамилию</p>
        <input
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, sureName: e.target.value })
          }
          placeholder="Фамилия"
          type="text"
        />
        <p className="error-text">{errors.sureName}</p>
        <p>Введите Очество</p>
        <input
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, patronymic: e.target.value })
          }
          placeholder="Если есть"
          type="text"
        />
        <p>Введите номер</p>
        <IMaskInput
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, telNumber: e.target.value })
          }
          mask="+{7} (000) 000-00-00"
          placeholder="Введите номер телефона"
        />
        <p className="error-text">{errors.telNumber}</p>
        <p>Введите почту</p>
        <input
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, email: e.target.value })
          }
          placeholder="Почта"
          type="email"
        />
        <p className="error-text">{errors.email}</p>
        <p>Выберите правильный город</p>
        <div class="selectgorod">
          <select
            onChange={(e) =>
              setNewUserObject({ ...newUserObject, optionTown: e.target.value })
            }
          >
            <option>Таганрог</option>
            <option>Москва</option>
            <option>Нью-Йорк</option>
          </select>
        </div>
        <div>
          <button type="submit">Отправить данные</button>
        </div>
      </form>
    </div>
  );
};

export default App;
