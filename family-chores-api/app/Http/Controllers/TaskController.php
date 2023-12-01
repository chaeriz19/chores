<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Task;
use Carbon\Carbon;
class TaskController extends Controller
{
    public function get_tasks() {
        $tasks = Auth::user()->tasks;
        return response()->json($tasks);
    }


    public function store(Request $request) {
        $request->validate([
            'user_name' => 'required|exists:users,name',
            'title' => 'required|string',
            'description' => 'nullable|string',
            'completed' => 'boolean',
            'due_date' => 'required|date_format:d/m/Y',
        ]);

        $dueDate = Carbon::createFromFormat('d/m/Y', $request->input('due_date'))->format('Y-m-d');
        $user = User::where('name', $request->input("user_name"))->first();

        $task = $user->tasks()->create([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'completed' => $request->input('completed', false),
            'due_date' => $dueDate,
        ]);

        return response()->json($task, 201);
    }

    public function delete(Request $request) {
        $task = Task::where('id', $request->input('id'))->first();
        $task->delete();
    }

    public function count(Request $request) {
        $user = Auth::user();
        $count = $user->tasks()->count();
        return response()->json(['count' => $count]);
    }

    public function get() {
        $tasks = Auth::user()->tasks;
        return response()->json($tasks);
    }
    public function get_all_tasks() {
        $tasks = Task::all();
        return response()->json($tasks);
    }
    public function toggle_completed(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:tasks,id',
        ]);

        $task = Task::findOrFail($request->input('id'));

        $task->update([
            'completed' => !$task->completed,
        ]);

        return response()->json($task);
    }
}
