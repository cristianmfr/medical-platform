// hooks react
import { useState } from "react";
// firebase
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../../config/Firebase";
import { where, query, collection, getDocs, doc } from "firebase/firestore";

// metodo de login
export const loginMedic = () => {
    // pegando input do usuario
    const [input, getInput] = useState("");
    const [password, getPassword] = useState("");
    // armazenando dados do medico
    const [medicFetchData, setMediFetchData] = useState([])
    const [medicEmail, setMedicEmail] = useState("")
    const [crm, setCrm] = useState("")
    // db ref
    const medicDataRef = collection(db, "medicos");
        
    // processo de login
    const loginProcess = async () => {  
        // 1 - validar se é email ou cpf
        var regex = /@/;

        if(regex.test(input)){
            const queryMedic = query(medicDataRef, where("email", "==", input));
            const medicValidate = await getDocs(queryMedic);
            setMediFetchData((medicValidate.docs.map((doc) => ({ ...doc.data(), id: doc.id}))))
            setMedicEmail(medicFetchData[0].email)
        } else {
            const queryMedic = query(medicDataRef, where("crm", "==", input));
            const medicValidate = await getDocs(queryMedic);
            setMediFetchData((medicValidate.docs.map((doc) => ({ ...doc.data(), id: doc.id}))))
            setMedicEmail(medicFetchData[0].email)
            setUserCpf(medicFetchData[0].crm)
        };

        // 2 - validar login
        if(input == medicEmail || input == crm){
          try {
            signInWithEmailAndPassword(auth, medicEmail, password)
        } catch (err) {
            console.error(err);
        };
        } else {
            alert("Usuário não cadastrado!")
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
    }
}