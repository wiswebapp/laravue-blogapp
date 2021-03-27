<?php

namespace App\Http\Controllers\Api;

use App\Blog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Arr;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $searchParams = $request->all();
        $blogQuery = Blog::query();
        $sort = Arr::get($searchParams, 'sort', 'id');
        $order = Arr::get($searchParams, 'order', 'desc');
        $title = Arr::get($searchParams, 'title', '');
        
        if(!empty($title)){
          $blogQuery->where('title', 'LIKE', '%'.$request->title.'%');
        }

        return $blogQuery->with('user')->orderBy($sort,$order)->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|min:10',
            'body' => 'required|min:20',
        ]);
        $blog = Blog::create($request->all());
        return $blog;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function show(Blog $blog)
    {
        $data['blog'] = $blog;
        $data['blog']['user'] = $blog->user;
        return $data;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'title' => 'min:10',
            'body' => 'min:20',
        ]);
        $blog->update($request->all());
        return $blog;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Blog  $blog
     * @return \Illuminate\Http\Response
     */
    public function destroy(Blog $blog)
    {
        try {
            return $blog->delete();
        } catch (\Exception $ex) {
            return ['error' => $ex->getMessage()];
        }
    }
}
