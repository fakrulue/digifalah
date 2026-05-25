<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\PageBlock;
use App\Models\User;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        // Create default admin user
        if (!User::where('email', 'admin@digifalah.com')->exists()) {
            User::create([
                'name' => 'Administrator',
                'email' => 'admin@digifalah.com',
                'password' => bcrypt('password'),
            ]);
        }

        $this->call(PageBlocksSeeder::class);
    }
}
