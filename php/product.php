<?php
$product = [
    "name" => "Premium LED Photo Frame",
    "price" => "₹2,499",
    "description" => "Premium Quality Photo Frame with LED Lighting. Custom Size Available.",
    "image" => "assets/images/placeholder.jpg"
];
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo $product['name']; ?></title>

<script src="https://cdn.tailwindcss.com"></script>

</head>

<body class="bg-black text-white">

<div class="max-w-7xl mx-auto py-20 px-6">

<div class="grid md:grid-cols-2 gap-12">

<div>

<img src="<?php echo $product['image']; ?>"
class="rounded-3xl w-full shadow-xl">

<div class="grid grid-cols-4 gap-4 mt-5">

<img src="assets/images/placeholder.jpg" class="rounded-xl cursor-pointer">

<img src="assets/images/placeholder.jpg" class="rounded-xl cursor-pointer">

<img src="assets/images/placeholder.jpg" class="rounded-xl cursor-pointer">

<img src="assets/images/placeholder.jpg" class="rounded-xl cursor-pointer">

</div>

</div>

<div>

<h1 class="text-5xl font-bold text-yellow-400">

<?php echo $product['name']; ?>

</h1>

<h2 class="text-3xl mt-6">

<?php echo $product['price']; ?>

</h2>

<p class="text-gray-300 mt-6 leading-8">

<?php echo $product['description']; ?>

</p>

<div class="mt-10 flex gap-5">

<a href="https://wa.me/919723202162"

class="bg-green-600 px-8 py-4 rounded-full">

WhatsApp Order

</a>

<button

class="bg-yellow-500 text-black px-8 py-4 rounded-full">

Add Wishlist

</button>

</div>

<h3 class="text-2xl mt-12 text-yellow-400">

Product Features

</h3>

<ul class="mt-5 space-y-3 text-gray-300">

<li>✔ Premium Quality</li>

<li>✔ Waterproof Finish</li>

<li>✔ Custom Size</li>

<li>✔ Fast Delivery</li>

<li>✔ Best Gift Option</li>

</ul>

</div>

</div>

</div>

</body>

</html>