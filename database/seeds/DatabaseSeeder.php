<?php

use App\Blog;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 999; $i++) { 
            factory(App\Blog::class,1)->create(['title' => $i."st Blog" ]);
        }
    }
}
