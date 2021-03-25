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
        factory(App\User::class,10)->create();

        for ($i=0; $i < 100; $i++) { 
            factory(App\Blog::class)->create([
                'user_id'=>rand(1,10),
            ]);
        }
    }
}
