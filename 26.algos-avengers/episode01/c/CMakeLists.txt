cmake_minimum_required(VERSION 4.0)
project(avengersCall C)

set(CMAKE_C_STANDARD 11)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

add_executable(avengersCall main.c)
