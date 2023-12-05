import { useState } from "react";

// importando config do firebase
import { db, auth, googleProvider, facebookProvider } from "../../../config/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDocs, collection, addDoc, doc, setDoc } from "firebase/firestore";

// criar usuario comum - cliente
export const createUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [cpf, setCpf] = useState("");
    const [tel, setTel] = useState("");

    const [confirmPass, setConfirmPass] = useState("");
    
    // função para criar conta
    const signUp = async () => {
        try{
            // if para validar senhas
            if (confirmPass == password){
                createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
                    // metodo para salvar a uid do usuário que esta sendo cadastrado
                    const user = userCredential.user;
                    const uid = user.uid;

                    // adicionando as credenciais em uma doc
                    await setDoc(doc(db, "clientes", uid), {
                        nome: name,
                        sobrenome: surname,
                        cpf: cpf,
                        telefone: tel,
                        email: email,
                        id: uid,
                        tipo: "Cliente",
                    });
                });
            } else {
                // trocar para manipular a DOM e adicionar um texto vermelho abaixo do input de senha
                alert("As senhas não são iguais")
            };
        } catch (err) {
            console.error(err);
        };
    };

    // criando conta com google
    const signUpWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        };
    };

    // criando conta com facebook
    const signUpWithFacebook = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
        } catch (err) {
            console.error(err);
        };
    };

    // add redirecionamento após registro com google e fb
    // pagina para colocar os dados restantes

    return {
        name,
        surname,
        cpf,
        tel,
        email,
        password,
        confirmPass,
        setName,
        setSurname,
        setCpf,
        setTel,
        setEmail,
        setPassword,
        setConfirmPass,
        signUp,
        signUpWithGoogle,
        signUpWithFacebook,
    };
};