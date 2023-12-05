import { useState } from "react";

// importando config do firebase
import { db, auth, googleProvider, facebookProvider, storage } from "../../../config/Firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDocs, collection, addDoc, doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { v4 } from "uuid";

// cadastro de profissional / medico
export const createMedicUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [cpf, setCpf] = useState("");
    const [tel, setTel] = useState("");
    const [crm, setCrm] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [clinic, setClinic] = useState("");
    const [img, setImg] = useState(null);
    // endereço
    const [adress, setAdress] = useState("");
    const [cep, setCep] = useState("");
    const [num, setNum] = useState("");
    const [bairro, setBairro] = useState("");
    // coordenadas
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    // foto de perfil
    const [imgURL, setImgURL] = useState("");
    // validação de senha
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

                    // enviando foto de perfil  / arquivo
                    const storageRef = ref(storage, `profissionais_img/${img.name}`);
                    
                    uploadBytes(storageRef, img);

                    getDownloadURL(storageRef).then((url) => {
                        const profileURL = url;
                        setImgURL(profileURL)
                    });

                    // buscando localização
                    const adressQuery = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?components=route:${adress}${num}|administrative_area:${bairro}|country:Brazil&key=AIzaSyAgJ3zWz0hxNvGrmd0_qNK6R5bDxG-rOtE`);
                    const adressData = await adressQuery.json();
                    const { results } = adressData;

                    // armazenando
                    if (results && results.length > 0) {
                        const { lat, lng } = results[0].geometry.location;
                        setLatitude(lat);
                        setLongitude(lng);
                      } else {
                        throw new Error('Nenhum resultado encontrado');
                      }
                    
                    // criando doc no db
                    await setDoc(doc(db, "medicos", uid), {
                        nome: name,
                        sobrenome: surname,
                        cpf: cpf,
                        crm: crm,
                        telefone: tel,
                        email: email,
                        especialidade: specialty,
                        nome_clinica: clinic,
                        end_rua: adress,
                        end_num: num,
                        end_bairro: bairro,
                        end_cep: cep,
                        lat: latitude,
                        lng: longitude, 
                        id_user: uid,
                        profile_photo: imgURL,
                    });

                    // salvando referencia no banco de usuarios
                    await setDoc(doc(db, "usuarios", uid), {
                        id_user: uid,
                        tipo: "Medico",
                    })
                });
            } else {
                // trocar para manipular a DOM e adicionar um texto vermelho abaixo do input de senha
                alert("As senhas não são iguais")
            };
        } catch (err) {
            console.error(err);
        };
    };

    return{
        name,
        surname,
        cpf,
        crm,
        tel,
        email,
        specialty,
        clinic,
        adress,
        bairro,
        num,
        cep,
        password,
        confirmPass,
        img,
        imgURL,
        setName,
        setSurname,
        setCpf,
        setCrm,
        setTel,
        setEmail,
        setSpecialty,
        setClinic,
        setAdress,
        setCep,
        setBairro,
        setNum,
        setPassword,
        setConfirmPass,
        setImgURL,
        setImg,
        signUp,
    }
};