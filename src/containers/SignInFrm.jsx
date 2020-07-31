/** Dependencies */
import React, { useEffect } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/** Helper */
import history from '../helpers/history';
/** Action */
import { signInAction } from '../actions/auth.action';

/** Container */
export default function SignInFrm() {
  const { errors, handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const redirect = useSelector(state => state.session.redirect);
  const message = useSelector(state => state.session.message);
  const isAuthenticated = useSelector(state => state.session.isAuthenticated);

  const onSubmit = (data, event) => {
    event.preventDefault();
    dispatch(signInAction(data));
  };

  useEffect(() => {
    isAuthenticated === true && history.push(redirect);
  });

  return (
    <>
      <div className='row d-flex justify-content-center'>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className=' text-center text-muted mb-4'>
            <h4>Sign in to the App</h4>
          </div>
          <Card className='mb-2 col-12'>
            <Card.Body>
              <Form.Group>
                <Form.Control
                  type='text'
                  className='bg-light'
                  name='username'
                  placeholder='email'
                  size='sm'
                  ref={register({
                    required: true,
                    pattern: /^[^@]+@[^@]+.[a-zA-Z]{2,}$/,
                  })}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type='password'
                  className='bg-light'
                  name='password'
                  placeholder='password'
                  size='sm'
                  ref={register({ required: true })}
                />
              </Form.Group>
              <div className='form-group'>
                <Button type='submit' variant='primary' block size='sm'>
                  Log in
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card className='mb-2 pt-2'>
            <Form.Label className='small d-flex justify-content-center'>
              New to App?&nbsp;
              <Link history={history} to='/signup'>
                Create an account.
              </Link>
            </Form.Label>
          </Card>
          <div>
            {errors.password?.type == 'required' ||
            errors.username?.type == 'required' ||
            errors.username?.type == 'pattern' ? (
              <Alert variant='danger' className='small text-center'>
                Incorrect Email or password
              </Alert>
            ) : (
              ''
            )}
            {message && !isAuthenticated && (
              <Alert variant='danger' className='small text-center'>
                {message}
              </Alert>
            )}
          </div>
        </Form>
      </div>
    </>
  );
}
