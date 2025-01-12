import React, { useState } from "react";
import { z } from "zod";

const userSchema = z.object({
  name: z.string(),
  sureName: z.string(),
  patronymic: z.string(),
  telNumber: z.string().min(10, "Номер не полный").max(11, "Слишком большой номер"),
  email: z.string().email("Неверный формат email"),
  optionTown: z.string(),
});


const newUser = {
  userName: "",
  sureName: "",
  patronymic: "",
  telNumber: "" + "",
  email: "",
  optionTown: "",
};

const App = () => {
  const [newUserObject, setNewUserObject] = useState(newUser);
  const [errors, setErrors] = useState({});
  console.log(errors);
  
  

  const handleSubmit = () => {
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
      <form onChange={handleSubmit}>
        <p>Введите имя</p>
        <input
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, userName: e.target.value })
          }
          placeholder="Имя"
          type="text"
        />
        <p>Введите фамилию</p>
        <input
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, sureName: e.target.value })
          }
          placeholder="Фамилия"
          type="text"
        />
        <p>Введите Очество</p>
        <input
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, patronymic: e.target.value })
          }
          placeholder="Если есть"
          type="text"
        />
        <p>Введите номер</p>
        <select onChange={(e) => setNewUserObject({...newUserObject, telNumber: e.target.value})}>
          <option>+7</option>
          <option>+380</option>
        </select>
        <input
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, telNumber: e.target.value })
          }
          placeholder=""
          type="text"
        />
        <p>Введите почту</p>
        <input
          onChange={(e) =>
            setNewUserObject({ ...newUserObject, email: e.target.value })
          }
          placeholder="Почта"
          type="email"
        />
        <p>Выберите правильный город</p>
        <div class="selectgorod">
          <select onChange={(e) => setNewUserObject({...newUserObject, optionTown: e.target.value})}>
            <option >Выберите город</option>
            <option>Таганрог</option>
            <option >Москва</option>
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
