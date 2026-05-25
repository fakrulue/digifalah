<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->latest()->get();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function roles()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all();
        return Inertia::render('Admin/Users/Roles', [
            'roles' => $roles,
            'permissions' => $permissions
        ]);
    }

    public function storeRole(Request $request)
    {
        $request->validate(['name' => 'required|string|unique:roles,name']);
        Role::create(['name' => $request->name]);
        return back()->with('success', 'Role created successfully.');
    }

    public function destroyRole(Role $role)
    {
        $role->delete();
        return back()->with('success', 'Role deleted successfully.');
    }

    public function assignRole(Request $request, User $user)
    {
        $request->validate(['role' => 'required|string|exists:roles,name']);
        
        // Use syncRoles to replace, or assignRole to add
        $user->syncRoles([$request->role]);
        
        return back()->with('success', 'Role assigned successfully.');
    }

    public function syncPermissions(Request $request, Role $role)
    {
        $request->validate(['permissions' => 'array']);
        $role->syncPermissions($request->permissions ?? []);
        return back()->with('success', 'Permissions updated successfully.');
    }
}
