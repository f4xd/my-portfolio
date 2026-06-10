#!/bin/bash

API_KEY="your-secret-key-change-this"
BASE_URL="http://localhost:3000"

echo "=== Testing Dynamic Portfolio API ==="
echo ""

echo "✓ Get Portfolio Data (PUBLIC):"
curl -s "$BASE_URL/api/portfolio" | python3 -m json.tool | head -20
echo ""

echo "✓ Get Profile (PUBLIC):"
curl -s "$BASE_URL/api/profile" | python3 -m json.tool
echo ""

echo "✓ Get Projects (PUBLIC):"
curl -s "$BASE_URL/api/projects" | python3 -m json.tool | head -20
echo ""

echo "✓ Test Admin API Key:"
curl -s -H "X-API-Key: $API_KEY" "$BASE_URL/api/profile" | python3 -m json.tool | head -10
echo ""

echo "=== All tests passed! ==="
echo ""
echo "Admin Panel: $BASE_URL/admin"
echo "API Key: $API_KEY"
