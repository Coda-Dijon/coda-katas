cmake_minimum_required(VERSION 4.0)
project(src C)

set(CMAKE_C_STANDARD 11)

include_directories(.)

add_executable(src
        gilded_rose.c
        gilded_rose.h
        test.c)
