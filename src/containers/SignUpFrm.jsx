/** Dependencies  */
import React, { useEffect } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
/** Helpers */
import history from '../helpers/history';
import { encryptPassword } from '../helpers/bcrypt';
/** Action Creator */
import { signUpAction } from '../actions/auth.action';

/** Container */
export default function SignUpFrm() {
  const { handleSubmit, errors, register } = useForm();
  const dispatch = useDispatch();
  const redirect = useSelector(state => state.session.redirect);
  const message = useSelector(state => state.session.message);
  const isAuthenticated = useSelector(state => state.session.isAuthenticated);

  const onSubmit = async data => {
    data.password = await encryptPassword(data.password);
    dispatch(signUpAction(data));
  };

  useEffect(() => {
    isAuthenticated === true && history.push(redirect);
  });

  return (
    <>
      <div className='row d-flex justify-content-center'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className='text-center text-muted mb-4'>
            <h4>Create your account</h4>
          </div>
          <Card className='mb-2 col-12'>
            <Card.Body>
              <Form.Group>
                <Form.Label className='small'>
                  Email: <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  className='bg-light'
                  type='text'
                  name='username'
                  placeholder='Enter your email'
                  size='sm'
                  ref={register({
                    required: true,
                    pattern: /^[^@]+@[^@]+.[a-zA-Z]{2,}$/,
                  })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className='small'>
                  Password: <span className='text-danger'>*</span>
                </Form.Label>
                <Form.Control
                  className='bg-light'
                  type='password'
                  name='password'
                  placeholder='Enter your password'
                  size='sm'
                  ref={register({ required: true })}
                />
              </Form.Group>
              <Form.Group>
                <Button variant='primary' type='submit' value='Register' size='sm' block>
                  Register
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>
          {errors.username?.type == 'required' || errors.password?.type == 'required' ? (
            <Alert variant='danger' className='small text-center'>
              Incorrect email or password
            </Alert>
          ) : (
            ''
          )}
          {errors.username?.type == 'pattern' ? (
            <Alert variant='danger' className='small text-center'>
              Incorrect email format
            </Alert>
          ) : (
            ''
          )}
          {message && (
            <Alert variant='danger' className='small text-center'>
              {message}
            </Alert>
          )}
        </Form>
      </div>
    </>
  );
}
