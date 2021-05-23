import argparse
import os
import subprocess
import colorama

FULL_WDITH = [2560, 1920, 1280]
HALF_WIDTH = [1280, 960, 640]
SMALL_WIDTH = [854, 640, 427]
XSMALL_WIDTH = [640, 480, 320]
POSTFIX = ["2k", "1080p", "720p"]

err_count = 0

parser = argparse.ArgumentParser(
    description="Process images and output in web-friendly formats.")
parser.add_argument("input_dir")
parser.add_argument("output_dir")
args = parser.parse_args()

if not os.path.isdir(args.input_dir):
    print(colorama.Fore.RED + "Cannot access input_dir as a directory")
    exit(1)
if os.path.exists(args.output_dir) and not os.path.isdir(args.output_dir):
    print(colorama.Fore.RED + "output_dir exists but is not a directory")
    exit(1)

if not os.path.exists(args.output_dir):
    os.mkdir(args.output_dir)

for dirpath, dirnames, filenames in os.walk(args.input_dir):
    output_path = dirpath.replace(args.input_dir, args.output_dir, 1)
    if os.path.exists(output_path) and not os.path.isdir(output_path):
        print(colorama.Fore.RED + output_path +
              " exists and is not a directory")
        exit(1)
    if not os.path.exists(output_path):
        os.mkdir(output_path)

    for name in filenames:
        print(colorama.Fore.RESET + "Processing " + os.path.join(dirpath, name))
        basename, ext = os.path.splitext(name)

        # Check extension
        if ext.lower() not in [".png", ".jpg", ".webp", ".avif"]:
            print(colorama.Fore.RED + "Image of type " +
                  ext + " is not supported")
            err_count += 1
            continue

        # Check size
        size = basename.split("_")[-1]
        if size not in ["xsmall", "small", "half", "full"]:
            print(colorama.Fore.RED + "Unknown size for " + name)
            err_count += 1
            continue

        widths = []
        if size == "xsmall":
            widths = XSMALL_WIDTH
        elif size == "small":
            widths = SMALL_WIDTH
        elif size == "half":
            widths = HALF_WIDTH
        elif size == "full":
            widths = FULL_WDITH

        for index, width in enumerate(widths):
            src = os.path.join(dirpath, name)
            dest = os.path.join(output_path, basename +
                                "_" + POSTFIX[index] + ".png")

            if os.path.exists(dest):
                if os.path.getmtime(src) < os.path.getmtime(dest):
                    continue

            subprocess.call([
                "convert",
                src,
                "-strip",
                "-interlace",
                "Plane",
                "-quality",
                "85",
                "-resize",
                str(width),
                dest
            ])
            print(colorama.Fore.GREEN + "===>" +
                  colorama.Fore.RESET + " Successfully outputed " + dest)

        for index, width in enumerate(widths):
            src = os.path.join(dirpath, name)
            dest = os.path.join(output_path, basename +
                                "_" + POSTFIX[index] + ".webp")

            if os.path.exists(dest):
                if os.path.getmtime(src) < os.path.getmtime(dest):
                    continue

            subprocess.call([
                "convert",
                src,
                "-strip",
                "-quality",
                "85",
                "-define",
                "webp:lossless=false",
                "-define",
                "webp:method=6",
                "-resize",
                str(width),
                dest
            ])
            print(colorama.Fore.GREEN + "===>" +
                  colorama.Fore.RESET + " Successfully outputed " + dest)


if err_count == 0:
    print("Completed successfully.")
else:
    print("Conversion finished with " + str(err_count) + " errors.")
