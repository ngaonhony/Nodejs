import 'dart:io';
import 'dart:typed_data';
import 'package:image_picker/image_picker.dart';
import 'package:image/image.dart' as img;

class ImagePickerLogic {
  final ImagePicker _picker = ImagePicker();
  List<XFile> selectedImages = [];

  Future<void> pickImages() async {
    final List<XFile>? images = await _picker.pickMultiImage(maxHeight: 600, maxWidth: 800);
    if (images != null && images.length <= 10) {
      selectedImages = images;
    } else {
      throw Exception("Bạn chỉ có thể chọn tối đa 10 ảnh.");
    }
  }

  Future<List<XFile>> compressImages() async {
    List<XFile> compressedImages = [];
    for (var imageFile in selectedImages) {
      File file = File(imageFile.path);
      List<int> imageBytes = await file.readAsBytes();
      img.Image? image = img.decodeImage(Uint8List.fromList(imageBytes));
      if (image != null) {
        List<int> compressedBytes = img.encodeJpg(image, quality: 85);
        final compressedFile = await file.writeAsBytes(compressedBytes);
        compressedImages.add(XFile(compressedFile.path));
      }
    }
    return compressedImages;
  }
}