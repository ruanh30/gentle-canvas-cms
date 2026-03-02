import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      toast.success(isRegister ? 'Conta criada com sucesso!' : 'Login realizado!');
      if (email === 'admin@modastore.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-display">{isRegister ? 'Criar conta' : 'Entrar'}</CardTitle>
          <CardDescription className="font-body">
            {isRegister ? 'Preencha os dados para se cadastrar' : 'Entre com seu e-mail e senha'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div><Label>Nome</Label><Input placeholder="Seu nome" className="mt-1" /></div>
            )}
            <div><Label>E-mail</Label><Input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="email@exemplo.com" className="mt-1" /></div>
            <div><Label>Senha</Label><Input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" /></div>
            <Button type="submit" className="w-full rounded-lg font-body">{isRegister ? 'Cadastrar' : 'Entrar'}</Button>
          </form>
          <div className="mt-4 text-center">
            <button onClick={() => setIsRegister(!isRegister)} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
              {isRegister ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastrar'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
