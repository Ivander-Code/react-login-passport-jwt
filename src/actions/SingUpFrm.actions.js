import {useState} from 'react';
import {encryptPassword} from '../helpers/bcrypt';
import {singup} from '../services/authentication.service';
import history from "../helpers/history";
import {validForm} from "../helpers/validForm";

export default function LoginFrm (){
    const [fields, setFields] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (event)=>{
        event.persist();
        setFields( (fields) =>({...fields,[event.target.name]:event.target.value}) );
    };

    const handleSubmit = async(event)=>{
        event.preventDefault();
        event.persist();
        let response = {};
        let validResult = validForm(fields);
        if(validResult.isValidForm){
            fields.password = await encryptPassword(fields.password);
            response = await singup(fields);
            setFields({});
            setMessage(response.data.message);
            history.push(response.data.redirect);

        }else{
            setFields({});
            setMessage(validResult.message);
            history.push('/singup');
        }
        event.target.reset();
    };

    return{ fields,handleChange,handleSubmit, message, setMessage};
};