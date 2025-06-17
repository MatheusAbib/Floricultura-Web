<?php
require __DIR__ . '/vendor/autoload.php';

//use Dotenv\Dotenv;

error_reporting(E_ALL);
ini_set('display_errors', 1);

/* Carrega variáveis do .env
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load(); */

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $emailUsuario = $_POST['email'] ?? '';

    // Validação rigorosa do email
    if (!filter_var($emailUsuario, FILTER_VALIDATE_EMAIL)) {
        header("HTTP/1.1 400 Bad Request");
        die("Por favor, insira um e-mail válido.");
    }

    // Pega a chave da API do SendGrid a partir de $_ENV
    $sendgridApiKey = $_ENV['SENDGRID_API_KEY'] ?? null;

    if (!$sendgridApiKey) {
        die("Erro: Chave SENDGRID_API_KEY não encontrada.");
    }

    // Template HTML moderno para o email
$htmlContent = <<<EOT
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
            font-family: 'Montserrat', sans-serif;
            color: #263238;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        }
        .header {
            background: linear-gradient(135deg, #2e7d32, #81c784);
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            font-family: 'Playfair Display', serif;
            margin: 0;
            font-size: 28px;
        }
        .content {
            padding: 30px 20px;
        }
        .content h2 {
            font-family: 'Playfair Display', serif;
            color: #2e7d32;
            font-size: 22px;
            margin-bottom: 15px;
        }
        .content p {
            font-size: 16px;
            margin: 10px 0;
            color: #444;
        }
        .cta-button {
            display: inline-block;
            background-color: #2e7d32;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 30px;
            font-weight: bold;
            margin-top: 20px;
            transition: all 0.4s ease;
        }
        .cta-button:hover {
            background-color:rgb(55, 133, 59);
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            font-size: 12px;
            color: #757575;
            padding: 15px;
        }
        .footer a {
            color: #757575;
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1><i class="bi bi-flower1 loading-logo"></i> Bem-vindo à Floricultura Web</h1>
        </div>
        <div class="content">
            <h2>Olá, amante da natureza!</h2>
            <p>Obrigado por se inscrever em nossa newsletter. A partir de agora, você receberá:</p>
            <ul>
                <li>Dicas exclusivas sobre cuidados com plantas</li>
                <li>Promoções imperdíveis diretamente no seu e-mail</li>
                <li>Novidades e inspirações florais para seu lar</li>
            </ul>
            <p>Estamos felizes em ter você com a gente 🌿</p>
            <p style="text-align: center;">
              <a href="https://floricultura-web-production.up.railway.app/" class="cta-button" style="color: #ffffff !important; text-decoration: none !important;">Visite Nosso Site</a>
            </p>
        </div>
        <div class="footer">
            Floricultura Web © <?= date('Y') ?>
        </div>
    </div>
</body>
</html>
EOT;


    try {
        $sendgrid = new \SendGrid($sendgridApiKey);

        $email = new \SendGrid\Mail\Mail();
        $email->setFrom("bilitardomatheus@gmail.com", "Floricultura Web");
        $email->setSubject("🌻 Sua assinatura foi confirmada!");
        $email->addTo($emailUsuario, "Assinante");
        $email->addContent("text/plain", "Obrigado por assinar nossa newsletter!");
        $email->addContent("text/html", $htmlContent);

        $response = $sendgrid->send($email);

        if ($response->statusCode() >= 200 && $response->statusCode() < 300) {
          echo "obrigado";
          exit;

        } else {
            throw new Exception("Falha no envio: " . $response->body());
        }
    } catch (Exception $e) {
        echo "<h2>Erro no envio do email:</h2>";
        echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
        exit;
    }
} else {
    // Se não for POST, apenas mostra um formulário simples (opcional)
    echo <<<FORM
<form method="post" action="">
    <label for="email">Digite seu email para assinar a newsletter:</label><br>
    <input type="email" id="email" name="email" required>
    <button type="submit">Assinar</button>
</form>
FORM;
}
