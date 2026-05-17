<?php
/**
 * Easy Dubbing - Video Config API
 * Endpoint: https://easydubbing.uk/api/videos.php
 * GET  → returns video URLs for all languages
 * POST → update video URL for a language (admin protected)
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

define('ADMIN_PASSWORD', 'EasyDub@2025!');
define('DATA_FILE', __DIR__ . '/../data/video_config.json');

$languages = ['en', 'fr', 'es', 'it', 'ru', 'de', 'ar'];

// Ensure data directory + file exist
if (!file_exists(dirname(DATA_FILE))) {
    mkdir(dirname(DATA_FILE), 0755, true);
}
if (!file_exists(DATA_FILE)) {
    $default = [];
    foreach ($languages as $lang) $default[$lang] = '';
    file_put_contents(DATA_FILE, json_encode($default, JSON_PRETTY_PRINT));
}

// ── GET: return current config ─────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo file_get_contents(DATA_FILE);
    exit;
}

// ── POST: update a language video ──────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $body = json_decode(file_get_contents('php://input'), true);

    if (!$body || !isset($body['password'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing body or password']);
        exit;
    }

    if ($body['password'] !== ADMIN_PASSWORD) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid password']);
        exit;
    }

    $config = json_decode(file_get_contents(DATA_FILE), true);

    // Update all provided language URLs
    foreach ($languages as $lang) {
        if (isset($body[$lang])) {
            $config[$lang] = trim($body[$lang]);
        }
    }

    file_put_contents(DATA_FILE, json_encode($config, JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'config' => $config]);
    exit;
}

http_response_code(405);
echo json_encode(['error' => 'Method not allowed']);
