// hooks
import { useState } from "react";

// firebase
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../../config/Firebase";
import { where, query, collection, getDocs, doc } from "firebase/firestore";

export const loginUser = () => {
    // receber o input do usuário (email ou cpf)
    const [input, getInput] = useState("");
    const [password, getPassword] = useState("");

    // buscando dados e armazenando
    const [userFechData, setUserFechData] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [userCpf, setUserCpf] = useState("");

    // ref do db
    const userDataRef = collection(db, "clientes");
    
    // processo de validação
    const loginProcess = async () => {
        // validar se é email ou cpf
        var regex = /@/;

        if(regex.test(input)){
            const queryUser = query(userDataRef, where("email", "==", input));
            const userValidate = await getDocs(queryUser);
            setUserFechData((userValidate.docs.map((doc) => ({ ...doc.data(), id: doc.id}))))
            setUserEmail(userFechData[0].email)
            console.log(userFechData)
        } else {
            const queryUser = query(userDataRef, where("cpf", "==", input));
            const userValidate = await getDocs(queryUser);
            setUserFechData((userValidate.docs.map((doc) => ({ ...doc.data(), id: doc.id}))))
            setUserEmail(userFechData[0].email)
            setUserCpf(userFechData[0].cpf)
        };

        // validando login
        if(input == userEmail || input == userCpf){
          try {
            signInWithEmailAndPassword(auth, userEmail, password)
        } catch (err) {
            console.error(err);
        };
        } else {
            alert("Usuário não cadastrado!")
        }
    };

    // executando a busca até encontrar, caso contrario apresenta erro - ps: gambiarra que funcionou kkkkkkkkkkkkkkkkkkkkkkkkkk
    const login = async () => {
        loginProcess()

        if(userFechData.length == 0) {
            loginProcess()
        } else {
            console.log("Nada encontrado!")
        }
    }

    // metodo para dar logout
    const logout = async () => {
        try {
            signOut(auth)
        } catch (err) {
            console.error(err);
        };
    }

    return{
        input,
        getInput,
        password,
        getPassword,
        logout,
        loginProcess,
        login,
    }
}