<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class PermissionSeeder extends Seeder
{
    public function run()
    {
        $entities = ['blog', 'blog_categories', 'blog_comments', 'subscribers', 'leads', 'campaigns', 'invoices', 'pricing', 'services', 'media', 'seo', 'settings', 'users', 'roles', 'builder'];
        $actions = ['view', 'create', 'edit', 'delete'];

        foreach ($entities as $entity) {
            foreach ($actions as $action) {
                Permission::firstOrCreate(['name' => $action . '_' . $entity]);
            }
        }

        $superAdmin = Role::firstOrCreate(['name' => 'super_admin']);
        $superAdmin->syncPermissions(Permission::all());

        $user = User::where('email', 'admin@digifalah.com')->first();
        if (!$user) {
            $user = User::create([
                'name' => 'Admin',
                'email' => 'admin@digifalah.com',
                'password' => bcrypt('password')
            ]);
        }
        $user->assignRole('super_admin');
    }
}
