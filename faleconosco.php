<?php
require 'vendor/autoload.php';

use SendGrid\Mail\Mail;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Captura e sanitiza os dados do formulário
    $nome     = htmlspecialchars($_POST['nome'] ?? '');
    $email    = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $telefone = htmlspecialchars($_POST['telefone'] ?? '');
    $assunto  = htmlspecialchars($_POST['assunto'] ?? '');
    $mensagem = htmlspecialchars($_POST['mensagem'] ?? '');

    // Validação simples
    if (empty($nome) || empty($email) || empty($mensagem)) {
        http_response_code(400);
        echo "Campos obrigatórios não preenchidos.";
        exit;
    }

    // Criação do e-mail
    $emailSend = new Mail();
    $emailSend->setFrom("contato@seudominio.com", "Contato Site"); // 🔁 Altere esse remetente
    $emailSend->setSubject("Nova mensagem de contato: $assunto");
    $emailSend->addTo("bilitardomatheus@gmail.com", "Você");   

    $emailSend->addContent(
        "text/html",
        "<strong>Nome:</strong> $nome<br>
         <strong>Email:</strong> $email<br>
         <strong>Telefone:</strong> $telefone<br>
         <strong>Assunto:</strong> $assunto<br>
         <strong>Mensagem:</strong><br>$mensagem"
    );

    // Cria o objeto SendGrid com sua chave
    $sendgrid = new \SendGrid('SUA_API_KEY_AQUI'); // 🔁 Substitua pela sua chave da SendGrid

    try {
        $response = $sendgrid->send($emailSend);

        if ($sendgrid->send($emailSend)) {
  echo "ok";
} else {
  http_response_code(500);
  echo "erro";
}


    } catch (Exception $e) {
        http_response_code(500);
        echo 'Erro ao enviar: ' . $e->getMessage();
    }
} else {
    http_response_code(405);
    echo "Método não permitido.";
}
