<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Models\BlogComment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogCommentController extends Controller {
    public function index() {
        return Inertia::render('Admin/Blog/Comments', [
            'comments' => BlogComment::with('post')->orderByDesc('created_at')->get()
        ]);
    }

    public function update(Request $request, BlogComment $comment) {
        $data = $request->validate([
            'reply' => 'nullable|string',
            'is_approved' => 'boolean'
        ]);
        $comment->update($data);
        return back()->with('success', 'Comment updated.');
    }

    public function destroy(BlogComment $comment) {
        $comment->delete();
        return back()->with('success', 'Comment deleted.');
    }
}
