<?php

namespace App\Http\Controllers\Api;

use App\Blog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $allBlog = Blog::orderBy('id','desc')->paginate(10);
        return $allBlog;
    }

    public function search(Request $request)
    {
        if( !empty($request->title) ){
            $data = Blog::where('title', 'LIKE', '%'.$request->title.'%');            
        }else{
            $data = Blog::orderBy('id','desc');
        }
        return $data->paginate(10);
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
        //For Hardcoding To add User
        $data = $request->all();
        $data['user_id'] = 1;
        $blog = Blog::create($data);
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
        return $blog;
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
